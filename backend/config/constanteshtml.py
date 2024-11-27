ALLOWED_TAGS = [
    'b', 'i', 'u', 'a', 'p', 'strong', 'em',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',  # Headers
    'span',                               # Inline styling/formatting
    'div',                               # Block-level container
    'ul', 'ol', 'li',                    # Lists
    'br',                                # Line breaks
    'img',                               # Images (since you have img attributes)
    'table', 'thead', 'tbody', 'tr', 'th', 'td'  # Tables
]

ALLOWED_ATTRIBUTES = {
    "*": ["style"],
    'a': ['href', 'title', 'rel'],
    'img': ['src', 'alt'],
    'span': ['class'],
    'div': ['class'],
    'p': ['class']
}