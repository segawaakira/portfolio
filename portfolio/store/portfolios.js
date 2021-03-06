import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const portfoliosRef = db.collection('portfolios')

export const state = () => ({
  portfolios: []
})

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('portfolios', portfoliosRef)
  }),
  add: firestoreAction((context, {order,name, term,description,url,images,technologies}) => {
    if(name.trim()) {
      portfoliosRef.doc(name).set({
        order: order,
        name: name,
        term: term,
        description: description,
        url: url,
        images: images,
        technologies: technologies,
        created: firebase.firestore.FieldValue.serverTimestamp()
      })
    }
  }),
  remove: firestoreAction((context, id) => {
    portfoliosRef.doc(id).delete()
  }),
}

export const getters = {
  orderdPortfolios: (state) => {
    return _.orderBy(state.portfolios, 'order', 'asc')
    //     return _.sortBy(state.portfolios, 'created')
  }
}
