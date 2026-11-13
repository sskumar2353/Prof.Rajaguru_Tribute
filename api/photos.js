// Local photos endpoint — Google Photos integration removed
export default function handler(req, res) {
  res.status(200).json({ status: 'ok', message: 'Local assets are loaded directly from /assets.' });
}
