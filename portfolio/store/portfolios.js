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
  add: firestoreAction((context, name) => {
    if(name.trim()) {
      portfoliosRef.add({
        name: name,
        done: false,
        created: firebase.firestore.FieldValue.serverTimestamp()
      })
    }
  }),
  // remove: firestoreAction((context, id) => {
  //   portfoliosRef.doc(id).delete()
  // }),
  // toggle: firestoreAction((context, portfolio) => {
  //   portfoliosRef.doc(portfolio.id).update({
  //     done: !portfolio.done
  //   })
  // })
}

// export const getters = {
//   orderdPortfolios: state => {
//     return _.sortBy(state.portfolios, 'created')
//   }
// }