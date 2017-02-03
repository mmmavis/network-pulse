import React from 'react';
import { browserHistory } from 'react-router';
import HintMessage from '../../components/hint-message/hint-message.jsx';
import utility from '../../js/utility';
import user from '../../js/app-user';

// import { Form } from 'react-formbuilder';
import PulseForm from './form/builder/pulse-form.jsx';
import Form from './form/builder/form.jsx';

export default React.createClass({
  getInitialState() {
    return {
      numCreatorFields: 1,
      user
    };
  },
  componentDidMount() {
    user.verify(this.props.router.location, () => this.setState({ user }));
  },
  handleSignInBtnClick(event) {
    event.preventDefault();

    user.login(utility.getCurrentURL());
  },
  handleLogOutBtnClick(event) {
    event.preventDefault();

    user.logout();
    browserHistory.push({
      pathname: `/featured`
    });
  },
  handleCreatorClick(event) {
    event.preventDefault();
    this.setState({numCreatorFields: this.state.numCreatorFields+1});
  },
  getContentForLoggedInUser() {
    return( <div>
              <p>(TODO:FIXME: form for logged in user to be built)</p>
              <p>Hi<span className="user-full-name"> {user.username}</span></p>
              <p className="log-out-prompt">Not you? <button className="btn btn-link" onClick={this.handleLogOutBtnClick}>Sign out</button>.</p>
            </div>);
  },
  getFailurePrompt() {
    return ( <HintMessage imgSrc={`/assets/svg/icon-user.svg`}
                          header={`Sign in failed`}
                          internalLink={`/featured`}
                          linkText={`Explore featured`}>
              <p>Only Mozilla staff can login now as we test this new platform. Check back soon!</p>
            </HintMessage>);
  },
  getAnonymousContent() {
    return (<HintMessage imgSrc={`/assets/svg/icon-user.svg`}
                         header={`Please sign in to add a post`}
                         externalLink={user.getLoginURL(utility.getCurrentURL())}
                         linkText={`Sign in`}
                         onClick={this.handleSignInBtnClick}>
              <p>Please note, only Mozilla staff can login now as we test this new platform.</p>
            </HintMessage>);
  },
  getContent() {
    if (user.loggedin) {
      return this.getContentForLoggedInUser();
    }

    if (user.failedLogin) {
      return this.getFailurePrompt();
    }

    return this.getAnonymousContent();
  },
  render() {
    var formFields = {
      title: {
        type: `text`,
        label: `Title of the project`,
        placeholder: `Title`,
        labelClassname: `form-control-label`,
        fieldClassname: `form-control`,
        validator: {
          error: ``
        }
      },
      content_url: {
        type: `text`,
        label: `URL`,
        placeholder: `https://example.com`,
        labelClassname: `form-control-label`,
        fieldClassname: `form-control`,
        validator: {
          error: ``
        }
      },
      description: {
        type: `textarea`,
        label: `Describe what you are sharing. Keep it simple and use plain language.`,
        placeholder: `Description`,
        optional: true,
        labelClassname: `form-control-label`,
        fieldClassname: `form-control`,
        validator: {
          error: ``
        }
      },
      creators: {
        type: `text`,
        label: `Who are the creators? This could be staff, contributors, partners…`,
        optional: true,
        labelClassname: `form-control-label`,
        fieldClassname: `form-control`,
        validator: {
          error: ``
        }
      },
      tags: {
        type: `text`,
        label: `Keywords to help with search by program, event, campaign, subject …`,
        placeholder: `#mozfest  #code  #tool`,
        optional: true,
        labelClassname: `form-control-label`,
        fieldClassname: `form-control`,
        validator: {
          error: ``
        }
      },
      issues: {
        type: `checkboxGroup`,
        label: `Check any Key Internet Issues that relate to your project.`,
        options: [`Privacy & Security`, `Open Innovation`, `Decentralization`, `Web Literacy`, `Digital Inclusion`],
        colCount: 1,
        optional: true,
        labelClassname: `form-control-label`,
        fieldClassname: `form-control`,
        validator: {
          error: ``
        }
      },
      get_involved: {
        type: `text`,
        label: ` Looking for support? Describe how people can do that.`,
        placeholder: `Contribute to the code.`,
        optional: true,
        labelClassname: `form-control-label`,
        fieldClassname: `form-control`,
        validator: {
          error: ``
        }
      },
      get_involved_url: {
        type: `text`,
        label: `Link for people to get involved.`,
        placeholder: `https://example.com`,
        optional: true,
        labelClassname: `form-control-label`,
        fieldClassname: `form-control`,
        validator: {
          error: ``
        }
      },
      thumbnail_url: {
        type: `text`,
        label: `URL to thumbnail image`,
        placeholder: `https://example.com`,
        optional: true,
        labelClassname: `form-control-label`,
        fieldClassname: `form-control`,
        validator: {
          error: ``
        }
      },
    };

    return (
      <div className="add-page">
        <Form fields={formFields} onSubmit={function(){}} onUpdate={null} />
        <PulseForm />
        { this.getContent() }
      </div>
    );
  }
});
