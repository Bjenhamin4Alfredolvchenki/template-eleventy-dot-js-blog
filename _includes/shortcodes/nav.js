/**
 * @file Defines a menucode for displaying a navigation menu
 * @author Reuben L. Lillie <reubenlillie@gmail.com>
 * @see {@link https://www.11ty.dev/docs/languages/javascript/#javascript-template-functions JavaScript template functions in 11ty}
 */

/**
 * A JavaScript Template module for a navigation menu
 * @module _includes/shortcodes/grid-nav
 * @param {Object} eleventyConfig 11ty’s Config API
 */
module.exports = eleventyConfig =>

  /**
   * Navigation markup
   * @method
   * @name nav
   * @param {Array} collection 11ty collection to map over
   * @param {Object} page The current 11ty `page` object
   * @param {String|Array} classes CSS classes for the `nav` (optional)
   * @return {String} The rendered shortcode
   * @example `${this.nav(data.collections.policies, data.page)}`
   * @see {@link https://www.11ty.dev/docs/collections/ Collections in 11ty}
   * @see {@link https://www.11ty.dev/docs/data/ Using data in 11ty}
   */
  eleventyConfig.addShortcode('nav', (collection, page, classes) => {
    var classList = []
    if (classes !== undefined) {
      if (typeof classes === 'string') {
        classList.push(classes)
      }
      if (Array.isArray(classes)) {
        classList = [...classes]
      }
    }
    return typeof collection !== 'undefined' && collection.length > 0
      ? `<nav class="${classList.map(item => `${item}`).join(' ')}">
        ${collection
          .sort((a, b) => a.data.weight - b.data.weight)
          .map(item => page.url === item.url
            ? `<a href="${item.url}" aria-current="page">
                ${item.data.menuTitle
                  ? item.data.menuTitle
                  : item.data.title
                }
              </a>`
            : `<a href="${item.url}">
                ${item.data.menuTitle
                  ? item.data.menuTitle
                  : item.data.title
                }
              </a>`).join("\n")}
        </nav>`
      : ''
  })