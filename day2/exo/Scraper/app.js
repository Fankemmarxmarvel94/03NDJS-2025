const fs = require('fs');

const cheerio = require('cheerio');

(async () => {
  try {
    // On récupère le HTML avec cheerio
    const $ = await cheerio.fromURL('https://fr.wikipedia.org/wiki/Liste_des_footballeurs_les_plus_cap%C3%A9s_en_%C3%A9quipe_nationale');



    const tableData = [];

    // Sélection du tableau contenant les données
    const table = $('table.wikitable');

    // Parcours des lignes du tableau
    table.find('tr').each((i, row) => {
      const cells = $(row).find('td');
      if (cells.length > 0) {
        const rowData = {
          rang: $(cells[0]).text().trim(),
          joueur: $(cells[1]).text().trim(),
          selection: $(cells[2]).text().trim(),
          confederation: $(cells[3]).text().trim(),
          premiere: $(cells[4]).text().trim(),
          derniere: $(cells[5]).text().trim(),
          duree: $(cells[6]).text().trim(),
          matchs: $(cells[7]).text().trim(),
        };
        tableData.push(rowData);
      }
kn jn    });

    // ✅ Enregistrement dans un fichier JSON
    fs.writeFileSync('donnees.json', JSON.stringify(tableData, null, 2), 'utf-8');
    console.log('✅ Données enregistrées dans donnees.json');

  } catch (error) {
    console.error('Erreur :', error);
  }
})();
