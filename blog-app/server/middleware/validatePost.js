const validatePost = (req, res, next) => {
    const { title, content, category } = req.body;
    const errors = [];

    // Validate title
    if (!title || title.trim().length === 0) {
        errors.push('Title is required');
    } else if (title.trim().length < 3) {
        errors.push('Title must be at least 3 characters long');
    }

    // Validate content
    if (!content || content.trim().length === 0) {
        errors.push('Content is required');
    }

    // Validate category if provided
    if (category) {
        const validCategories = ['Technology', 'Travel', 'Food', 'Lifestyle', 'Other'];
        if (!validCategories.includes(category)) {
            errors.push(`Invalid category. Must be one of: ${validCategories.join(', ')}`);
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({
            message: 'Validation failed',
            errors
        });
    }

    next();
};

module.exports = validatePost;