/**
 * @memberof store:Auth
 * @param {Boolean} val - Modifica la sesión en el state a true o false
 * @mutation SESSION_UPDATE
 */
export const SESSION_UPDATE = (state, val) => {
  state.isAuthenticated = val;
};
