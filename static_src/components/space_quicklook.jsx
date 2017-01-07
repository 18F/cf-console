
import React from 'react';

import style from 'cloudgov-style/css/cloudgov-style.css';
import createStyler from '../util/create_styler';

import AppQuicklook from './app_quicklook.jsx';
import EntityIcon from './entity_icon.jsx';
import PanelRow from './panel_row.jsx';
import { spaceHref } from '../util/url';

const propTypes = {
  space: React.PropTypes.object.isRequired,
  orgGuid: React.PropTypes.string.isRequired,
  showAppDetail: React.PropTypes.bool
};

const defaultProps = {
  showAppDetail: false
};

export default class SpaceQuicklook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.styler = createStyler(style);
  }

  spaceHref() {
    const props = this.props;
    return spaceHref(props.orgGuid, props.space.guid);
  }

  render() {
    const space = this.props.space;
    return (
      <PanelRow id={ `space-quicklook-${space.guid}` } className="test-space-quicklook">
        <h3 className={ this.styler('contents-primary') }>
          <EntityIcon entity="space" iconSize="medium" />
          <a href={ this.spaceHref() }>{ space.name }</a>
        </h3>
        { space.apps && space.apps.map((app) =>
           <AppQuicklook
             key={ app.guid }
             app={ app }
             orgGuid={ this.props.orgGuid }
             spaceGuid={ space.guid }
             spaceName={ space.name }
             extraInfo={ this.props.showAppDetail ?
               ['state', 'memory', 'diskQuota'] : ['state'] }
           />
        )}
      </PanelRow>
    );
  }
}

SpaceQuicklook.propTypes = propTypes;
SpaceQuicklook.defaultProps = defaultProps;