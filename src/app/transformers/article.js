/* ============
 * Account Transformer
 * ============
 *
 * The transformer for the account
 */

import Transformer from './transformer';

export default class ArticleTransformer extends Transformer {

    /**
     *
     * @param article
     * @returns {{title: null, email: null}}
     */
    static fetch(article) {
        return {
            title: article.title,
            content: article.content
        };
    }

    /**
     *
     * @param article
     * @returns {{_id: null, user: null, title: null, content: null}}
     */
    static send(article) {
        return {
            _id: null,
            user: null,
            title: article.title,
            content: article.content
        };
    }
}
