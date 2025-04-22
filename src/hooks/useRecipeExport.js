import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { useRecipeCalculations } from './useRecipeCalculations';

export function useRecipeExport(recipe) {
  const { total: nutritionalValues } = useRecipeCalculations(recipe);

  const exportToPDF = () => {
    if (!recipe) return;

    const doc = new jsPDF();
    let yPos = 20;

    // Title
    doc.setFontSize(20);
    doc.text(recipe.name, 20, yPos);
    yPos += 20;

    // Ingredients
    doc.setFontSize(16);
    doc.text('Ingredients:', 20, yPos);
    yPos += 10;

    doc.setFontSize(12);
    recipe.recipe_ingredients.forEach(({ quantity, unit, ingredients }) => {
      doc.text(`- ${quantity}${unit} ${ingredients.name}`, 30, yPos);
      yPos += 10;
    });

    // Preparation Steps
    yPos += 10;
    doc.setFontSize(16);
    doc.text('Preparation:', 20, yPos);
    yPos += 10;

    doc.setFontSize(12);
    recipe.preparation_steps.forEach((step, index) => {
      const lines = doc.splitTextToSize(`${index + 1}. ${step}`, 170);
      lines.forEach(line => {
        doc.text(line, 30, yPos);
        yPos += 10;
      });
    });

    // Nutritional Values
    yPos += 10;
    doc.setFontSize(16);
    doc.text('Nutritional Values (per 100g):', 20, yPos);
    yPos += 10;

    doc.setFontSize(12);
    Object.entries(nutritionalValues).forEach(([key, value]) => {
      doc.text(`${key}: ${value.toFixed(2)}`, 30, yPos);
      yPos += 10;
    });

    doc.save(`${recipe.name}.pdf`);
  };

  const exportToExcel = () => {
    if (!recipe) return;

    const wb = XLSX.utils.book_new();

    // Recipe Details
    const recipeDetails = [
      ['Recipe Name', recipe.name],
      ['Category', recipe.category],
      ['Unit', recipe.unit],
      [''],
      ['Ingredients'],
      ['Quantity', 'Unit', 'Ingredient']
    ];

    recipe.recipe_ingredients.forEach(({ quantity, unit, ingredients }) => {
      recipeDetails.push([quantity, unit, ingredients.name]);
    });

    recipeDetails.push(['']);
    recipeDetails.push(['Nutritional Values (per 100g)']);
    Object.entries(nutritionalValues).forEach(([key, value]) => {
      recipeDetails.push([key, value.toFixed(2)]);
    });

    const ws = XLSX.utils.aoa_to_sheet(recipeDetails);
    XLSX.utils.book_append_sheet(wb, ws, 'Recipe');
    XLSX.writeFile(wb, `${recipe.name}.xlsx`);
  };

  return {
    exportToPDF,
    exportToExcel
  };
}