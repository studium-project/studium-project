import _ from 'lodash';
import React from 'react';
import {
    Divider,
    Header,
    Grid,
    List,
    Responsive,
    Icon,
} from 'semantic-ui-react';
import { Segment, Message, Popup } from 'semantic-ui-react';

const formatDate = (time) => {
    const d = new Date(time);
    return `${d.getMonth() + 1}월 ${d.getDate()}일`;
};

const TempData = [
    {
        time: 1578563233642,
        title: 'PHPSandbox',
        body: '문제가 삭제되었습니다',
        type: 'negative',
    },
    {
        time: 1578563233642,
        title: 'PerlSandbox',
        body: '문제가 추가되었습니다',
        type: 'positive',
    },
    {
        time: 1578563233642,
        title: 'PYSandbox',
        body: '문제가 추가되었습니다',
        type: 'positive',
    },
];

const NoticeMessage = ({ time, title, body, type }) => (
    <Popup
        content={formatDate(time)}
        inverted
        size='tiny'
        position='left center'
        trigger={
            <Message
                // positive={type == 'positive'}
                // warning={type == 'warning'}
                // negative={type == 'negative'}
                style={{
                    background: 'white',
                    boxShadow:
                        '0px 0px 0px 1px rgba(34, 36, 38, 0.1) inset, 0px 2px 4px 0px rgba(34, 36, 38, 0.06), 0px 2px 10px 0px rgba(34, 36, 38, 0.07)',
                }}
                floating
                color='white'
                size='tiny'>
                <Message.Header>{title}</Message.Header>
                <p>{body}</p>
            </Message>
        }
    />
);

const MobileInfo = () => (
    <div>
        <Grid padded divided>
            <Grid.Row>
                <Segment style={{ width: '100%' }}>
                    <List bulleted>
                        <List.Item>Gaining Access</List.Item>
                        <List.Item>Inviting Friends</List.Item>
                        <List.Item>
                            Benefits
                            <List.List>
                                <List.Item href='#'>
                                    Link to somewhere
                                </List.Item>
                                <List.Item>Rebates</List.Item>
                                <List.Item>Discounts</List.Item>
                            </List.List>
                        </List.Item>
                        <List.Item>Warranty</List.Item>
                    </List>
                </Segment>
            </Grid.Row>
            <Grid.Row>
                <Segment.Group>
                    <Segment>
                        <Header textAlign='center'>Introduction</Header>
                    </Segment>
                    <Segment>
                        <Header>1. About</Header>
                        <p>
                            역사와 전통의. Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit. Etiam eu eros nec dolor
                            congue auctor. Mauris magna ligula, ultricies nec
                            arcu a, placerat faucibus turpis. Praesent tempor mi
                            vitae viverra dignissim. Curabitur id auctor ante.
                            Nulla aliquet tortor tempor, congue tortor nec,
                            vehicula metus. Integer vel tristique tortor. Morbi
                            porttitor lectus at posuere vulputate. Aliquam
                            congue diam massa. Integer hendrerit bibendum ligula
                            mattis posuere. Sed lacinia nibh eget efficitur
                            volutpat. Cras quis enim tincidunt, bibendum sapien
                            a, tempus arcu. Donec facilisis, neque id molestie
                            faucibus, felis urna tincidunt augue, sagittis
                            feugiat neque dui sit amet felis. Sed lobortis et
                            leo at finibus. Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit. Ut eu elit sit amet
                            augue lobortis placerat sit amet ut leo. Vivamus
                            hendrerit semper feugiat.
                        </p>
                        <p>
                            Mauris eget interdum felis. Duis rutrum justo at
                            metus mollis, non pharetra nulla vulputate. Etiam ut
                            nunc id lacus eleifend condimentum quis ac massa.
                            Nullam malesuada ipsum at molestie dictum. Integer
                            sed feugiat est. Nulla tempus cursus sapien, eu
                            tincidunt metus consequat eu. Praesent at orci at
                            magna iaculis tempus. Pellentesque at lorem at
                            libero convallis tincidunt a eleifend mi. Aliquam
                            porttitor congue dolor in convallis. In hac
                            habitasse platea dictumst. Mauris pharetra, tortor
                            eu laoreet volutpat, ante augue semper nulla, porta
                            mattis erat neque sed metus. Quisque quam urna,
                            vehicula id dui nec, vulputate mattis neque. Ut
                            lacus sem, pulvinar nec nunc in, sodales semper
                            purus. Nulla id feugiat ipsum. Donec vel porttitor
                            sapien. Maecenas porta egestas hendrerit.
                        </p>
                        <Header>2. How to Play</Header>
                        <p>
                            Suspendisse potenti. Etiam gravida mollis justo,
                            facilisis luctus diam sollicitudin at. Orci varius
                            natoque penatibus et magnis dis parturient montes,
                            nascetur ridiculus mus. Nulla facilisi. Vestibulum
                            ante ipsum primis in faucibus orci luctus et
                            ultrices posuere cubilia Curae; Proin aliquam
                            tristique volutpat. Nunc id sapien ut nulla tempus
                            gravida. Nam ac lacus a nunc fringilla fringilla.
                            Cras sagittis pharetra nunc id faucibus.
                        </p>
                        <p>
                            Ut semper vehicula metus quis convallis. Morbi
                            tempus diam nisi, vel feugiat libero lacinia ut. Ut
                            tristique tristique libero, sed consequat ipsum
                            eleifend ut. Cras bibendum venenatis tellus, vel
                            malesuada mi congue hendrerit. Fusce id ultrices
                            orci, in hendrerit diam. Sed tempor tincidunt
                            volutpat. Maecenas vehicula sed sem eu mattis.
                            Aenean facilisis eu risus eu iaculis. Maecenas
                            hendrerit odio sed metus condimentum aliquam.
                            Maecenas accumsan neque velit, sit amet gravida nunc
                            sodales at. Etiam laoreet accumsan neque id
                            porttitor. Nunc semper finibus vehicula. Nunc tempus
                            molestie neque, eget eleifend justo sodales non.
                            Nullam non dolor in diam bibendum bibendum.
                        </p>
                        <p>
                            In venenatis arcu ut fringilla feugiat. Integer in
                            aliquet ante, in cursus tortor. Fusce volutpat
                            egestas massa et cursus. Suspendisse tincidunt at
                            leo ac semper. Ut sit amet convallis felis.
                            Suspendisse eu posuere nulla. Vivamus sagittis
                            ornare eros, id cursus enim semper in. Donec iaculis
                            non velit sed facilisis. Maecenas vel tellus at
                            lacus egestas consequat. Duis sapien tortor, egestas
                            sit amet vestibulum sed, vestibulum vitae nisi.
                        </p>
                    </Segment>
                </Segment.Group>
            </Grid.Row>
        </Grid>
    </div>
);

const NormalInfo = () => (
    <Grid padded>
        <Grid.Row>
            <Grid.Column width={12}>
                <Segment.Group>
                    <Segment>
                        <Header textAlign='center'>The Studium</Header>
                    </Segment>
                    <Segment>
                        <Header>1. About</Header>
                        <p>
                            <i>The Studium</i> eu eros nec dolor congue auctor.
                            Mauris magna ligula, ultricies nec arcu a, placerat
                            faucibus turpis. Praesent tempor mi vitae viverra
                            dignissim. Curabitur id auctor ante. Nulla aliquet
                            tortor tempor, congue tortor nec, vehicula metus.
                            Integer vel tristique tortor. Morbi porttitor lectus
                            at posuere vulputate. Aliquam congue diam massa.
                            Integer hendrerit bibendum ligula mattis posuere.
                            Sed lacinia nibh eget efficitur volutpat. Cras quis
                            enim tincidunt, bibendum sapien a, tempus arcu.
                            Donec facilisis, neque id molestie faucibus, felis
                            urna tincidunt augue, sagittis feugiat neque dui sit
                            amet felis. Sed lobortis et leo at finibus. Lorem
                            ipsum dolor sit amet, consectetur adipiscing elit.
                            Ut eu elit sit amet augue lobortis placerat sit amet
                            ut leo. Vivamus hendrerit semper feugiat.
                        </p>
                        <Header>2. How to Play</Header>
                        <p>
                            Suspendisse potenti. Etiam gravida mollis justo,
                            facilisis luctus diam sollicitudin at. Orci varius
                            natoque penatibus et magnis dis parturient montes,
                            nascetur ridiculus mus. Nulla facilisi. Vestibulum
                            ante ipsum primis in faucibus orci luctus et
                            ultrices posuere cubilia Curae; Proin aliquam
                            tristique volutpat. Nunc id sapien ut nulla tempus
                            gravida. Nam ac lacus a nunc fringilla fringilla.
                            Cras sagittis pharetra nunc id faucibus.
                        </p>
                        <p>
                            Ut semper vehicula metus quis convallis. Morbi
                            tempus diam nisi, vel feugiat libero lacinia ut. Ut
                            tristique tristique libero, sed consequat ipsum
                            eleifend ut. Cras bibendum venenatis tellus, vel
                            malesuada mi congue hendrerit. Fusce id ultrices
                            orci, in hendrerit diam. Sed tempor tincidunt
                            volutpat. Maecenas vehicula sed sem eu mattis.
                            Aenean facilisis eu risus eu iaculis. Maecenas
                            hendrerit odio sed metus condimentum aliquam.
                            Maecenas accumsan neque velit, sit amet gravida nunc
                            sodales at. Etiam laoreet accumsan neque id
                            porttitor. Nunc semper finibus vehicula. Nunc tempus
                            molestie neque, eget eleifend justo sodales non.
                            Nullam non dolor in diam bibendum bibendum.
                        </p>
                        <p>
                            In venenatis arcu ut fringilla feugiat. Integer in
                            aliquet ante, in cursus tortor. Fusce volutpat
                            egestas massa et cursus. Suspendisse tincidunt at
                            leo ac semper. Ut sit amet convallis felis.
                            Suspendisse eu posuere nulla. Vivamus sagittis
                            ornare eros, id cursus enim semper in. Donec iaculis
                            non velit sed facilisis. Maecenas vel tellus at
                            lacus egestas consequat. Duis sapien tortor, egestas
                            sit amet vestibulum sed, vestibulum vitae nisi.
                        </p>
                    </Segment>
                </Segment.Group>
            </Grid.Column>
            <Grid.Column width={4} style={{ 'padding-left': '0' }}>
                {/* <Message inverted>공지</Message> */}
                <Segment
                    style={{
                        textAlign: 'center',
                        'text-align': 'center',
                        'font-style': 'italic',
                        padding: '14px',
                        'font-size': '13px',
                        'margin-bottom': '0',
                        'font-weight': 'bold',
                    }}>
                    <Icon name='info' />
                    Notice
                </Segment>
                {/* <Segment>
                    <List bulleted>
                        <List.Item>Gaining Access</List.Item>
                        <List.Item>Inviting Friends</List.Item>
                        <List.Item>
                            Benefits
                            <List.List>
                                <List.Item href='#'>
                                    Link to somewhere
                                </List.Item>
                                <List.Item>Rebates</List.Item>
                                <List.Item>Discounts</List.Item>
                            </List.List>
                        </List.Item>
                        <List.Item>Warranty</List.Item>
                    </List>
                </Segment> */}
                {/* <Divider /> */}
                {_.map(TempData, NoticeMessage)}
            </Grid.Column>
        </Grid.Row>
    </Grid>
);

function Info() {
    return (
        <>
            <Responsive minWidth={992}>
                <NormalInfo />
            </Responsive>
            {/* <Responsive maxWidth={991}>
                <MobileInfo />
            </Responsive> */}
        </>
    );
}
export { Info };
