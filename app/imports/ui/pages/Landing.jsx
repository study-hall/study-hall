import React from 'react';
import { Grid, Icon, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const nameStyle = { fontSize: '50px' };
    const itemColor = { color: '#FFFF00' };
    const imageStyle = { width: '1450px', height: '500px', marginTop: '50px' };
    return (
        <div>
          <Grid columns={3} style={itemColor} container stackable centered>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <h1 style={nameStyle}>Study Hall</h1>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <Icon name="users icon" size='huge'/>
                <h1>Multiple Users</h1>
                {/* eslint-disable-next-line max-len */}
                <h3>Form online study groups with multiple users looking for help within the same subjects.</h3>
              </Grid.Column>

              <Grid.Column textAlign='center'>
                <Icon name="pencil alternate" size='huge'/>
                <h1>Hundreds of Classes</h1>
                {/* eslint-disable-next-line max-len */}
                <h3>Search for classes and subjects relevant to you. There are various subjects available on Study Hall.</h3>
              </Grid.Column>

              <Grid.Column textAlign='center' >
                <Icon name="graduation cap" size='huge'/>
                <h1>Become a Tutor!</h1>
                {/* eslint-disable-next-line max-len */}
                <h3>Experienced in a class? You can sign up and offer help to others for subjects as well.</h3>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Image src="/images/library.jpg" size='small' centered fluid style={imageStyle}></Image>
        </div>
    );
  }
}

export default Landing;
