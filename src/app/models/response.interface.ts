export interface LoginResponse {
  message: string; // Mensaje de la respuesta
  user: {
      success: boolean; // Indica si el inicio de sesión fue exitoso
      id: number; // ID del usuario
      name: string; // Nombre del usuario
  };
}
