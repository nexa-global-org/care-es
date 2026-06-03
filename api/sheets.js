const BASE_URL =
  'https://sheets.googleapis.com/v4/spreadsheets';

export default async function handler(
  req,
  res
) {
  try {
    const {
      spreadsheetId,
      sheet
    } = req.query;

    if (!spreadsheetId) {
      return res.status(400).json({
        error: 'spreadsheetId requerido'
      });
    }

    if (!sheet) {
      return res.status(400).json({
        error: 'sheet requerido'
      });
    }

    const apiKey =
      process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error:
          'GOOGLE_API_KEY no configurada'
      });
    }

    const url =
      `${BASE_URL}/${spreadsheetId}/values/${sheet}?key=${apiKey}`;

    const response =
      await fetch(url);

    if (!response.ok) {
      return res.status(
        response.status
      ).json({
        error:
          'Error consultando Google Sheets'
      });
    }

    const data =
      await response.json();

    return res.status(200).json(data);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error:
        'Error interno del servidor'
    });
  }

  const allowedSheets = [
  'about',
  'pets',
  'shop'
];

if (
  !allowedSheets.includes(sheet)
) {
  return res.status(400).json({
    error: 'Sheet inválida'
  });
}
}