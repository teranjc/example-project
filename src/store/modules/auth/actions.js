/**
 * @memberof store:Auth
 * @param {Boolean} val - Modifica la sesión en el state a true o false
 * @action session
 */
export const session = ({ commit }, payload) => {
  commit("SESSION_UPDATE", payload);
};