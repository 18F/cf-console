import React from 'react';
import style from 'cloudgov-style/css/cloudgov-style.css';

import createStyler from '../util/create_styler';
import AppStore from '../stores/app_store';
import BreadcrumbsItem from './breadcrumbs_item.jsx';
import OrgStore from '../stores/org_store';
import SpaceStore from '../stores/space_store';
import { orgHref, spaceHref } from '../util/url';


function stateSetter() {
  const app = AppStore.get(AppStore.currentAppGuid);
  const space = SpaceStore.get(SpaceStore.currentSpaceGuid);
  const org = OrgStore.get(OrgStore.currentOrgGuid);

  return {
    app,
    org,
    space
  };
}

export default class Breadcrumbs extends React.Component {
  constructor(props) {
    super(props);
    this.styler = createStyler(style);
    this.state = stateSetter();
  }

  render() {
    let breadcrumbs = [];
    const { org, space, app } = this.state;

    // Add the parent states
    if (org && org.name) {
      breadcrumbs.push(<BreadcrumbsItem key="home" url="/#/">overview</BreadcrumbsItem>);
    }

    if (space && space.name) {
      breadcrumbs.push(
        <BreadcrumbsItem key={ org.guid } url={ orgHref(org) }>{ org.name }</BreadcrumbsItem>
      );
    }

    if (app && app.name) {
      breadcrumbs.push(
        (
          <BreadcrumbsItem key={ space.guid } url={ spaceHref(org, space) }>
            { space.name }
          </BreadcrumbsItem>
        )
      );
    }

    return (
      <ol className={ this.styler('breadcrumbs') }>
        { breadcrumbs }
      </ol>
    );
  }
}