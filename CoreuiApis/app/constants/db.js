
/**
 * Builds sorting
 * @param {string} sort - field to sort from
 * @param {number} order - order for query (1,-1)
 */
const buildSort = (sort, order) => {
  const sortBy = {}
  sortBy[sort] = order
  return sortBy
}

/**
 * Hack for mongoose-paginate, removes 'id' from results
 * @param {Object} result - result object
 */
const cleanPaginationID = (result) => {
  // result.docs.map((element) => delete element.id)
  result.docs.map((element) => element)
  const data = {
    success: true,
    statuscode: 200,
    message: '',
    data: result
  }
  return data
}

/**
 * Builds initial options for query
 * @param {Object} query - query object
 */
const listInitOptions = async (req) => {
  return new Promise((resolve) => {
    const order = req.query.order || -1
    const sort = req.query.sort || 'createdAt'
    const sortBy = buildSort(sort, order)
    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 50
    const options = {
      sort: sortBy,
      lean: true,
      page,
      limit
    }
    resolve(options)
  })
}

module.exports = {
  /**
   * Checks the query string for filtering records
   * query.filter should be the text to search (string)
   * query.fields should be the fields to search into (array)
   * @param {Object} query - query object
   */
  async checkQueryString(query) {
    return new Promise((resolve, reject) => {
      try {
        if (
          typeof query.filter !== 'undefined' &&
          typeof query.fields !== 'undefined'
        ) {
          const data = {
            $or: []
          }
          // var object_label['screen_id']:{ $regex: new RegExp(query.label, 'i') }
          // }
          const array = []
          // Takes fields param and builds an array by splitting with ','
          const arrayFields = query.fields.split(',')
          // Adds SQL Like %word% with regex
          arrayFields.map((item) => {
            if (query.label !== undefined) {
              array.push({
                [item]: {
                  $regex: new RegExp(query.filter, 'i')
                },
                screen_id: {
                  $regex: new RegExp(query.label, 'i')
                }
              })
            } else if (query.table_name !== undefined) {
              array.push({
                [item]: {
                  $regex: new RegExp(query.filter, 'i')
                },
                table_name: {
                  $in: [query.table_name]

                  // $regex: new RegExp(query.table_name, 'i')
                }
              })
            } else if (query.req_no !== undefined) {
              array.push({
                [item]: {
                  $regex: new RegExp(query.filter, 'i')
                },
                req_no: {
                  $regex: new RegExp(query.req_no, 'i')
                }
              })
            } else if (query.key !== undefined && query.value !== undefined) {
              array.push({
                [item]: {
                  $regex: new RegExp(query.filter, 'i')
                },
                [query.key]: {
                  $in: [query.value]

                  // $regex: new RegExp(query.table_name, 'i')
                }
              })
            } else {
              array.push({
                [item]: {
                  $regex: new RegExp(query.filter, 'i')
                }
              })
            }
          })

          // Puts array result in data
          data.$or = array
          resolve(data)
        } else {
          resolve({})
        }
      } catch (err) {
        console.log(err.message)
        // reject(buildErrObject(422, 'ERROR_WITH_FILTER'))
      }
    })
  },

  /**
   * Gets items from database
   * @param {Object} req - request object
   * @param {Object} query - query object
   */
  async getItems(req, model, query) {
    const options = await listInitOptions(req)
    return new Promise((resolve, reject) => {
      model.paginate(query, options, (err, items) => {
        if (err) {
          // reject(buildErrObject(422, err.message))
        }
        resolve(cleanPaginationID(items))
      })
    })
  },

  async getItemsCities(req, model, query) {
    const options = await listInitOptions(req)
    return new Promise((resolve, reject) => {
      model.paginate(query, options, (err, items) => {
        if (err) {
          // reject(buildErrObject(422, err.message))
        }
        resolve(cleanPaginationID(items))
      })
    })
  },

  /**
   * Gets item from database by id
   * @param {string} id - item id
   */
  async getItem(id, model) {
    return new Promise((resolve, reject) => {
      model.findById(id, (err, item) => {
        // itemNotFound(err, item, reject, 'NOT_FOUND')
        resolve(item)
      })
    })
  },

  async getItemBylang(lang, model) {
    return new Promise((resolve, reject) => {
      model.find({}, (err, item) => {
        // itemNotFound(err, item, reject, 'NOT_FOUND')
        resolve(item)
      })
    })
  },

  async getItemByColumn(id, lang, model) {
    return new Promise((resolve, reject) => {
      model.find({ screen_id: id, language_code: lang }, (err, item) => {
        // itemNotFound(err, item, reject, 'NOT_FOUND')
        resolve(item)
      })
    })
  },

  async getItemFind(qyery, model) {
    return new Promise((resolve, reject) => {
      model.findOne(qyery, (err, item) => {
        if (item) {
          // itemNotFound(err, item, reject, 'NOT_FOUND')
          resolve(item)
        } else {
          resolve(false)
        }
      })
    })
  },

  async getItemByColumnlookup(lang, model, from, localField, foreignField) {
    return new Promise((resolve, reject) => {
      model.aggregate(
        [
          {
            $lookup: {
              from,
              localField,
              foreignField,
              as: from
            }
          }
        ],
        (err, item) => {
          // itemNotFound(err, item, reject, 'NOT_FOUND')
          resolve(item)
        }
      )
    })
  },

  /**
   * Creates a new item in database
   * @param {Object} req - request object
   */
  async createItem(req, model) {
    return new Promise((resolve, reject) => {
      model.create(req, (err, item) => {
        if (err) {
          // reject(buildErrObject(422, err.message))
        }
        resolve(item)
      })
    })
  },

  /**
   * Updates an item in database by id
   * @param {string} id - item id
   * @param {Object} req - request object
   */
  async updateItem(id, model, req) {
    return new Promise((resolve, reject) => {
      model.findByIdAndUpdate(
        id,
        req,
        {
          new: true,
          runValidators: true
        },
        (err, item) => {
          // itemNotFound(err, item, reject, 'NOT_FOUND')
          resolve(item)
        }
      )
    })
  },

  /**
   * Deletes an item from database by id
   * @param {string} id - id of item
   */
  // async deleteItem(id, model) {
  //   return new Promise((resolve, reject) => {
  //     model.findByIdAndRemove(id, (err, item) => {
  //       itemNotFound(err, item, reject, 'NOT_FOUND')
  //       resolve(buildSuccObject('DELETED'))
  //     })
  //   })
  // }
}
