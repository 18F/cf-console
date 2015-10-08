
import AppDispatcher from '../dispatcher.js';
import cfApi from '../util/cf_api.js';
import { orgActionTypes } from '../constants';

export default {

  fetchAll() {
    AppDispatcher.handleViewAction({
      type: orgActionTypes.ORGS_FETCH
    });

    console.log('orgactions, fetchall');
    cfApi.fetchOrgs();
  },

  receivedOrgs(orgs) {
    AppDispatcher.handleServerAction({
      type: orgActionTypes.ORGS_RECEIVED,
      orgs: orgs
    });
  }
};
