const userProfileComp = ({ match }) => {
    if (match.params.id !== 'posix') {
        return <NoMatch />;
    }
    return (
        <Grid padded>
            <Grid.Row>
                <Grid.Column width='3' textAlign='center'>
                    <Grid.Row>
                        <Header as='h1'>{match.params.id}</Header>
                    </Grid.Row>
                    <Grid.Row>
                        <i>http://p6.is/</i>
                    </Grid.Row>
                </Grid.Column>
                <Grid.Column width='13' vertical textAlign='middle'>
                    <Label color='red'>Contrib</Label>
                    <Label color='green'>AllClear</Label>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row padded>#1등. 9300점 보유 중.</Grid.Row>
            <Grid.Row>
                <Header style={{ 'margin-bottom': '-8px' }}>First Blood</Header>
                <Segment.Group style={{ width: '100%' }}>
                    <Segment>
                        <Grid columns='three'>
                            <SimpleProbInfo />
                            <SimpleProbInfo />
                            <SimpleProbInfo />
                            <SimpleProbInfo />
                            <SimpleProbInfo />
                            <SimpleProbInfo />
                            <SimpleProbInfo />
                        </Grid>
                    </Segment>
                </Segment.Group>
            </Grid.Row>
            <Grid.Row>
                <Header style={{ 'margin-bottom': '-8px' }}>Solved</Header>
                <Segment.Group style={{ width: '100%' }}>
                    <Segment>
                        <Grid columns='three'>
                            <SimpleProbInfo2 />
                            <SimpleProbInfo2 />
                            <SimpleProbInfo2 />
                        </Grid>
                    </Segment>
                </Segment.Group>
            </Grid.Row>
        </Grid>
    );
};
