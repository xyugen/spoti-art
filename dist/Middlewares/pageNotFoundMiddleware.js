export const pageNotFoundMiddleware = (req, res) => {
    res.status(404).json({ error: `Page not found` });
};
