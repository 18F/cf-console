
import BaseElement from './base.element';

// https://www.martinfowler.com/bliki/PageObject.html
//
// Represents a UserRoleElement for making assertions against. This makes it
// easier to abstract some of the webdriver details from the UI component.

// TODO attach to class as static property

const selectors = {
  tableRows: '.test-users .tableWrapper tbody',
  userRoleControls: '.test-user-role-control'
};

export default class UserRoleElement extends BaseElement {
  // TODO: Look into why "this.element('#org_role' + guid).checked
  // does not work. Currently, it doesn't work that way.
  isUserOrgManager(guid) {
    return !!this.browser.getAttribute(`#org_manager${guid}`, 'checked');
  }

  isUserBillingManager(guid) {
    return !!this.browser.getAttribute(`#billing_manager${guid}`, 'checked');
  }

  isUserOrgAuditor(guid) {
    return !!this.browser.getAttribute(`#org_auditor${guid}`, 'checked');
  }
}
