/* ============
 * Account Transformer
 * ============
 *
 * The transformer for the account
 */

import Transformer from './transformer';

export default class AccountTransformer extends Transformer {
  /**
   * Method used to transform a fetched account
   *
   * @param account The fetched account
   *
   * @returns {Object} The transformed account
   */
  static fetch(account) {
    return {
      id: account._id,
      email: account.email,
      firstName: account.firstName,
      lastName: account.lastName
    };
  }

  /**
   * Method used to transform a send account
   *
   * @param account The account to be send
   *
   * @returns {Object} The transformed account
   */
  static send(account) {
    return {
      _id: account.id,
      email: account.email,
      firstName: account.firstName,
      lastName: account.lastName,
    };
  }
}
