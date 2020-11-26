import React from 'react';
import { Icon, Message } from 'semantic-ui-react';

const NotFound = () => (
    <Message negative style={{ 'flex-grow': '0' }}>
        <Message.Header>
            <Icon name='warning sign' />
            &nbsp;Not Found
        </Message.Header>
        <p>요청하신 페이지를 찾을 수 없었습니다.</p>
    </Message>
);

export { NotFound };
