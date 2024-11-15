from .auth_view import auth_bp
from .celulares_view import celulares_bp

def register_blueprints(app):
    app.register_blueprint(auth_bp)
    app.register_blueprint(celulares_bp)
