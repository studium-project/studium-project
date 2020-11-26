const CONFIG = {
    QUERY: {
        REGISTER: `
            mutation ($username: String!, $password: String!, $email: String!, $nationality: String!) {
                register(username: $username, password: $password, email: $email, nationality: $nationality) {
                    token
                    code
                    message
                }
            }`,
        LOGIN: `
            query ($username: String!, $password: String!) {
                login(username: $username, password: $password) {
                    token
                    code
                    message
                    score
                }
            }`,
        CHALLENGES: `
            query {
                challenges {
                    id
                    name
                    author
                    category
                    description
                    hint
                    solves
                    point
                }
            }`,
        CHALLENGE: `
            query ($id: String) {
                challenges (id: $id) {
                    id
                    name
                    author
                    category
                    description
                    hint
                    solves
                    point
                }
            }`,
        USERS: `
            query ($offset: Int, $limit:Int, $type: String!)  {
                users (offset: $offset, limit: $limit) {
                    id
                    username
                    email
                    registered_time
                    last_submitted_time
                    score
                }
                total (type: $type){
                    count
                }
            }`,
        ADMINS: `
            query ($offset: Int, $limit:Int, $type: String!)  {
                admins (offset: $offset, limit: $limit) {
                    id
                    username
                    registered_time
                    masked_password
                    privilege
                }
                total (type: $type){
                    count
                }
            }`,
        USER: `
            query ($offset: Int, $limit: Int, $id: String)  {
                users (offset: $offset, limit: $limit, id: $id) {
                    id
                    username
                    email
                    registered_time
                    last_submitted_time
                    score
                    masked_password
                    nationality
                    active
                    homepage
                    comment
                }
            }`,
        ADMIN: `
            query ($offset: Int, $limit: Int, $id: String)  {
                admins (offset: $offset, limit: $limit, id: $id) {
                    id
                    username
                    registered_time
                    masked_password
                    privilege
                }
            }`,
        CREATE_USER: `
            mutation ($username: String!, $password: String!, $email: String!, $nationality: String!, $homepage: String!, $comment: String!) {
                createUser (username: $username, password: $password, email: $email, nationality: $nationality, homepage: $homepage, comment: $comment) {
                    message
                    code
                    id
                }
            }`,
        EDIT_USER: `
            mutation ($id: String!, $password: String!, $active: Boolean, $homepage: String!, $comment: String!, $nationality: String!) {
                modifyUser(id: $id, password: $password, active: $active, nationality: $nationality, homepage: $homepage, comment: $comment) {
                    code,
                    message
                    id
                }
            }`,
        DELETE_USER: `
            mutation ($id: String!) {
                removeUser(id: $id) {
                    code
                    message
                }
            }`,
        CREATE_CHALLENGE: `
            mutation ($name: String!, $author: String!, $category: [String]!, $description: String!, $point: Int!, $hint: String!) {
                createChall(name: $name, author: $author, category: $category, description: $description, point: $point, hint: $hint) {
                    code
                    message
                    id
                }
            }`,
        EDIT_CHALLENGE: `
            mutation ($id: String!, $name: String!, $author: String!, $category: [String]!, $description: String!, $point: Int!, $hint: String!) {
                modifyChall(id: $id, name: $name, author: $author, category: $category, description: $description, point: $point, hint: $hint) {
                    code
                    message
                    id
                }
            }`,
        DELETE_CHALLENGE: `
            mutation ($id: String!) {
                removeChall (id: $id) {
                    code
                    message
                }
            }`,
        USERS_LIMIT: 50,
        ADMINS_LIMIT: 50,
    },
    STATUS: {
        LOGIN: {
            NORMAL: 10,
            INVALID: 11,
            PROGRESS: 12,
            SUCCESS: 13,
            ADMIN: 14,
        },
        REGISTER: {
            NORMAL: 20,
            INVALID: 21,
            PROGRESS: 22,
            SUCCESS: 23,
            NEEDAGREE: 24,
        },
        FLAG_LOG: {
            CORRECT: 30,
            INCORRECT: 31,
            ERROR: 32,
        },
        LOGIN_LOG: {
            CORRECT: 40,
            INCORRECT: 41,
            ERROR: 42,
        },
        REGISTER_LOG: {
            CORRECT: 50,
            INCORRECT: 51,
            ERROR: 52,
        },
        ADMIN_CREATE: {
            NORMAL: 60,
            INVALID: 61,
            PROGRESS: 62,
            SUCCESS: 63,
            NEEDAGREE: 64,
        },
        ADMIN_EDIT: {
            NORMAL: 70,
            INVALID: 71,
            PROGRESS: 72,
            SUCCESS: 73,
            NEEDAGREE: 74,
        },
        ADMIN_DELETE: {
            NORMAL: 80,
            INVALID: 81,
            PROGRESS: 82,
            SUCCESS: 83,
            NEEDAGREE: 84,
        },
        USER_CREATE: {
            NORMAL: 90,
            INVALID: 91,
            PROGRESS: 92,
            SUCCESS: 93,
            NEEDAGREE: 94,
        },
        USER_EDIT: {
            NORMAL: 100,
            INVALID: 101,
            PROGRESS: 102,
            SUCCESS: 103,
            NEEDAGREE: 104,
        },
        USER_DELETE: {
            NORMAL: 110,
            INVALID: 111,
            PROGRESS: 112,
            SUCCESS: 113,
            NEEDAGREE: 114,
        },
        CHALLENGE_CREATE: {
            NORMAL: 120,
            INVALID: 121,
            PROGRESS: 122,
            SUCCESS: 123,
            NEEDAGREE: 124,
        },
        CHALLENGE_EDIT: {
            NORMAL: 130,
            INVALID: 131,
            PROGRESS: 132,
            SUCCESS: 133,
            NEEDAGREE: 134,
        },
        CHALLENGE_DELETE: {
            NORMAL: 140,
            INVALID: 141,
            PROGRESS: 142,
            SUCCESS: 143,
            NEEDAGREE: 144,
        },
    },
    USER_INFO: 'user_info',
    CATEGORY: [
        { key: 'XSS', text: 'XSS', value: 'XSS' },
        { key: 'SQLi', text: 'SQLi', value: 'SQLi' },
        { key: 'RCE', text: 'RCE', value: 'RCE' },
        { key: 'NoSQL', text: 'NoSQL', value: 'NoSQL' },
    ],
    COUNTRIES: [
        { key: 'af', text: 'Afghanistan', flag: 'af', value: 'af' },
        { key: 'ax', text: 'Aland Islands', flag: 'ax', value: 'ax' },
        { key: 'al', text: 'Albania', flag: 'al', value: 'al' },
        { key: 'dz', text: 'Algeria', flag: 'dz', value: 'dz' },
        { key: 'as', text: 'American Samoa', flag: 'as', value: 'as' },
        { key: 'ad', text: 'Andorra', flag: 'ad', value: 'ad' },
        { key: 'ao', text: 'Angola', flag: 'ao', value: 'ao' },
        { key: 'ai', text: 'Anguilla', flag: 'ai', value: 'ai' },
        { key: 'ag', text: 'Antigua', flag: 'ag', value: 'ag' },
        { key: 'ar', text: 'Argentina', flag: 'ar', value: 'ar' },
        { key: 'am', text: 'Armenia', flag: 'am', value: 'am' },
        { key: 'aw', text: 'Aruba', flag: 'aw', value: 'aw' },
        { key: 'au', text: 'Australia', flag: 'au', value: 'au' },
        { key: 'at', text: 'Austria', flag: 'at', value: 'at' },
        { key: 'az', text: 'Azerbaijan', flag: 'az', value: 'az' },
        { key: 'bs', text: 'Bahamas', flag: 'bs', value: 'bs' },
        { key: 'bh', text: 'Bahrain', flag: 'bh', value: 'bh' },
        { key: 'bd', text: 'Bangladesh', flag: 'bd', value: 'bd' },
        { key: 'bb', text: 'Barbados', flag: 'bb', value: 'bb' },
        { key: 'by', text: 'Belarus', flag: 'by', value: 'by' },
        { key: 'be', text: 'Belgium', flag: 'be', value: 'be' },
        { key: 'bz', text: 'Belize', flag: 'bz', value: 'bz' },
        { key: 'bj', text: 'Benin', flag: 'bj', value: 'bj' },
        { key: 'bm', text: 'Bermuda', flag: 'bm', value: 'bm' },
        { key: 'bt', text: 'Bhutan', flag: 'bt', value: 'bt' },
        { key: 'bo', text: 'Bolivia', flag: 'bo', value: 'bo' },
        { key: 'ba', text: 'Bosnia', flag: 'ba', value: 'ba' },
        { key: 'bw', text: 'Botswana', flag: 'bw', value: 'bw' },
        { key: 'bv', text: 'Bouvet Island', flag: 'bv', value: 'bv' },
        { key: 'br', text: 'Brazil', flag: 'br', value: 'br' },
        { key: 'vg', text: 'British Virgin Islands', flag: 'vg', value: 'vg' },
        { key: 'bn', text: 'Brunei', flag: 'bn', value: 'bn' },
        { key: 'bg', text: 'Bulgaria', flag: 'bg', value: 'bg' },
        { key: 'bf', text: 'Burkina Faso', flag: 'bf', value: 'bf' },
        { key: 'mm', text: 'Myanmar', flag: 'mm', value: 'mm' },
        { key: 'bi', text: 'Burundi', flag: 'bi', value: 'bi' },
        { key: 'tc', text: 'Caicos Islands', flag: 'tc', value: 'tc' },
        { key: 'kh', text: 'Cambodia', flag: 'kh', value: 'kh' },
        { key: 'cm', text: 'Cameroon', flag: 'cm', value: 'cm' },
        { key: 'ca', text: 'Canada', flag: 'ca', value: 'ca' },
        { key: 'cv', text: 'Cape Verde', flag: 'cv', value: 'cv' },
        { key: 'ky', text: 'Cayman Islands', flag: 'ky', value: 'ky' },
        {
            key: 'cf',
            text: 'Central African Republic',
            flag: 'cf',
            value: 'cf',
        },
        { key: 'td', text: 'Chad', flag: 'td', value: 'td' },
        { key: 'cl', text: 'Chile', flag: 'cl', value: 'cl' },
        { key: 'cn', text: 'China', flag: 'cn', value: 'cn' },
        { key: 'cx', text: 'Christmas Island', flag: 'cx', value: 'cx' },
        { key: 'cc', text: 'Cocos Islands', flag: 'cc', value: 'cc' },
        { key: 'co', text: 'Colombia', flag: 'co', value: 'co' },
        { key: 'km', text: 'Comoros', flag: 'km', value: 'km' },
        { key: 'cd', text: 'Congo', flag: 'cd', value: 'cd' },
        { key: 'cg', text: 'Congo Brazzaville', flag: 'cg', value: 'cg' },
        { key: 'ck', text: 'Cook Islands', flag: 'ck', value: 'ck' },
        { key: 'cr', text: 'Costa Rica', flag: 'cr', value: 'cr' },
        { key: 'ci', text: 'Cote Divoire', flag: 'ci', value: 'ci' },
        { key: 'hr', text: 'Croatia', flag: 'hr', value: 'hr' },
        { key: 'cu', text: 'Cuba', flag: 'cu', value: 'cu' },
        { key: 'cy', text: 'Cyprus', flag: 'cy', value: 'cy' },
        { key: 'cz', text: 'Czech Republic', flag: 'cz', value: 'cz' },
        { key: 'dk', text: 'Denmark', flag: 'dk', value: 'dk' },
        { key: 'dj', text: 'Djibouti', flag: 'dj', value: 'dj' },
        { key: 'dm', text: 'Dominica', flag: 'dm', value: 'dm' },
        { key: 'do', text: 'Dominican Republic', flag: 'do', value: 'do' },
        { key: 'ec', text: 'Ecuador', flag: 'ec', value: 'ec' },
        { key: 'eg', text: 'Egypt', flag: 'eg', value: 'eg' },
        { key: 'sv', text: 'El Salvador', flag: 'sv', value: 'sv' },
        { key: 'gq', text: 'Equatorial Guinea', flag: 'gq', value: 'gq' },
        { key: 'er', text: 'Eritrea', flag: 'er', value: 'er' },
        { key: 'ee', text: 'Estonia', flag: 'ee', value: 'ee' },
        { key: 'et', text: 'Ethiopia', flag: 'et', value: 'et' },
        { key: 'eu', text: 'Europeanunion', flag: 'eu', value: 'eu' },
        { key: 'fk', text: 'Falkland Islands', flag: 'fk', value: 'fk' },
        { key: 'fo', text: 'Faroe Islands', flag: 'fo', value: 'fo' },
        { key: 'fj', text: 'Fiji', flag: 'fj', value: 'fj' },
        { key: 'fi', text: 'Finland', flag: 'fi', value: 'fi' },
        { key: 'fr', text: 'France', flag: 'fr', value: 'fr' },
        { key: 'gf', text: 'French Guiana', flag: 'gf', value: 'gf' },
        { key: 'pf', text: 'French Polynesia', flag: 'pf', value: 'pf' },
        { key: 'tf', text: 'French Territories', flag: 'tf', value: 'tf' },
        { key: 'ga', text: 'Gabon', flag: 'ga', value: 'ga' },
        { key: 'gm', text: 'Gambia', flag: 'gm', value: 'gm' },
        { key: 'ge', text: 'Georgia', flag: 'ge', value: 'ge' },
        { key: 'de', text: 'Germany', flag: 'de', value: 'de' },
        { key: 'gh', text: 'Ghana', flag: 'gh', value: 'gh' },
        { key: 'gi', text: 'Gibraltar', flag: 'gi', value: 'gi' },
        { key: 'gr', text: 'Greece', flag: 'gr', value: 'gr' },
        { key: 'gl', text: 'Greenland', flag: 'gl', value: 'gl' },
        { key: 'gd', text: 'Grenada', flag: 'gd', value: 'gd' },
        { key: 'gp', text: 'Guadeloupe', flag: 'gp', value: 'gp' },
        { key: 'gu', text: 'Guam', flag: 'gu', value: 'gu' },
        { key: 'gt', text: 'Guatemala', flag: 'gt', value: 'gt' },
        { key: 'gn', text: 'Guinea', flag: 'gn', value: 'gn' },
        { key: 'gw', text: 'Guinea-Bissau', flag: 'gw', value: 'gw' },
        { key: 'gy', text: 'Guyana', flag: 'gy', value: 'gy' },
        { key: 'ht', text: 'Haiti', flag: 'ht', value: 'ht' },
        { key: 'hm', text: 'Heard Island', flag: 'hm', value: 'hm' },
        { key: 'hn', text: 'Honduras', flag: 'hn', value: 'hn' },
        { key: 'hk', text: 'Hong Kong', flag: 'hk', value: 'hk' },
        { key: 'hu', text: 'Hungary', flag: 'hu', value: 'hu' },
        { key: 'is', text: 'Iceland', flag: 'is', value: 'is' },
        { key: 'in', text: 'India', flag: 'in', value: 'in' },
        { key: 'io', text: 'Indian Ocean Territory', flag: 'io', value: 'io' },
        { key: 'id', text: 'Indonesia', flag: 'id', value: 'id' },
        { key: 'ir', text: 'Iran', flag: 'ir', value: 'ir' },
        { key: 'iq', text: 'Iraq', flag: 'iq', value: 'iq' },
        { key: 'ie', text: 'Ireland', flag: 'ie', value: 'ie' },
        { key: 'il', text: 'Israel', flag: 'il', value: 'il' },
        { key: 'it', text: 'Italy', flag: 'it', value: 'it' },
        { key: 'jm', text: 'Jamaica', flag: 'jm', value: 'jm' },
        { key: 'sj', text: 'Svalbard', flag: 'sj', value: 'sj' },
        { key: 'jp', text: 'Japan', flag: 'jp', value: 'jp' },
        { key: 'jo', text: 'Jordan', flag: 'jo', value: 'jo' },
        { key: 'kz', text: 'Kazakhstan', flag: 'kz', value: 'kz' },
        { key: 'ke', text: 'Kenya', flag: 'ke', value: 'ke' },
        { key: 'ki', text: 'Kiribati', flag: 'ki', value: 'ki' },
        { key: 'kw', text: 'Kuwait', flag: 'kw', value: 'kw' },
        { key: 'kg', text: 'Kyrgyzstan', flag: 'kg', value: 'kg' },
        { key: 'la', text: 'Laos', flag: 'la', value: 'la' },
        { key: 'lv', text: 'Latvia', flag: 'lv', value: 'lv' },
        { key: 'lb', text: 'Lebanon', flag: 'lb', value: 'lb' },
        { key: 'ls', text: 'Lesotho', flag: 'ls', value: 'ls' },
        { key: 'lr', text: 'Liberia', flag: 'lr', value: 'lr' },
        { key: 'ly', text: 'Libya', flag: 'ly', value: 'ly' },
        { key: 'li', text: 'Liechtenstein', flag: 'li', value: 'li' },
        { key: 'lt', text: 'Lithuania', flag: 'lt', value: 'lt' },
        { key: 'lu', text: 'Luxembourg', flag: 'lu', value: 'lu' },
        { key: 'mo', text: 'Macau', flag: 'mo', value: 'mo' },
        { key: 'mk', text: 'Macedonia', flag: 'mk', value: 'mk' },
        { key: 'mg', text: 'Madagascar', flag: 'mg', value: 'mg' },
        { key: 'mw', text: 'Malawi', flag: 'mw', value: 'mw' },
        { key: 'my', text: 'Malaysia', flag: 'my', value: 'my' },
        { key: 'mv', text: 'Maldives', flag: 'mv', value: 'mv' },
        { key: 'ml', text: 'Mali', flag: 'ml', value: 'ml' },
        { key: 'mt', text: 'Malta', flag: 'mt', value: 'mt' },
        { key: 'mh', text: 'Marshall Islands', flag: 'mh', value: 'mh' },
        { key: 'mq', text: 'Martinique', flag: 'mq', value: 'mq' },
        { key: 'mr', text: 'Mauritania', flag: 'mr', value: 'mr' },
        { key: 'mu', text: 'Mauritius', flag: 'mu', value: 'mu' },
        { key: 'yt', text: 'Mayotte', flag: 'yt', value: 'yt' },
        { key: 'mx', text: 'Mexico', flag: 'mx', value: 'mx' },
        { key: 'fm', text: 'Micronesia', flag: 'fm', value: 'fm' },
        { key: 'md', text: 'Moldova', flag: 'md', value: 'md' },
        { key: 'mc', text: 'Monaco', flag: 'mc', value: 'mc' },
        { key: 'mn', text: 'Mongolia', flag: 'mn', value: 'mn' },
        { key: 'me', text: 'Montenegro', flag: 'me', value: 'me' },
        { key: 'ms', text: 'Montserrat', flag: 'ms', value: 'ms' },
        { key: 'ma', text: 'Morocco', flag: 'ma', value: 'ma' },
        { key: 'mz', text: 'Mozambique', flag: 'mz', value: 'mz' },
        { key: 'na', text: 'Namibia', flag: 'na', value: 'na' },
        { key: 'nr', text: 'Nauru', flag: 'nr', value: 'nr' },
        { key: 'np', text: 'Nepal', flag: 'np', value: 'np' },
        { key: 'nl', text: 'Netherlands', flag: 'nl', value: 'nl' },
        { key: 'an', text: 'Netherlandsantilles', flag: 'an', value: 'an' },
        { key: 'nc', text: 'New Caledonia', flag: 'nc', value: 'nc' },
        { key: 'pg', text: 'New Guinea', flag: 'pg', value: 'pg' },
        { key: 'nz', text: 'New Zealand', flag: 'nz', value: 'nz' },
        { key: 'ni', text: 'Nicaragua', flag: 'ni', value: 'ni' },
        { key: 'ne', text: 'Niger', flag: 'ne', value: 'ne' },
        { key: 'ng', text: 'Nigeria', flag: 'ng', value: 'ng' },
        { key: 'nu', text: 'Niue', flag: 'nu', value: 'nu' },
        { key: 'nf', text: 'Norfolk Island', flag: 'nf', value: 'nf' },
        { key: 'kp', text: 'North Korea', flag: 'kp', value: 'kp' },
        {
            key: 'mp',
            text: 'Northern Mariana Islands',
            flag: 'mp',
            value: 'mp',
        },
        { key: 'no', text: 'Norway', flag: 'no', value: 'no' },
        { key: 'om', text: 'Oman', flag: 'om', value: 'om' },
        { key: 'pk', text: 'Pakistan', flag: 'pk', value: 'pk' },
        { key: 'pw', text: 'Palau', flag: 'pw', value: 'pw' },
        { key: 'ps', text: 'Palestine', flag: 'ps', value: 'ps' },
        { key: 'pa', text: 'Panama', flag: 'pa', value: 'pa' },
        { key: 'py', text: 'Paraguay', flag: 'py', value: 'py' },
        { key: 'pe', text: 'Peru', flag: 'pe', value: 'pe' },
        { key: 'ph', text: 'Philippines', flag: 'ph', value: 'ph' },
        { key: 'pn', text: 'Pitcairn Islands', flag: 'pn', value: 'pn' },
        { key: 'pl', text: 'Poland', flag: 'pl', value: 'pl' },
        { key: 'pt', text: 'Portugal', flag: 'pt', value: 'pt' },
        { key: 'pr', text: 'Puerto Rico', flag: 'pr', value: 'pr' },
        { key: 'qa', text: 'Qatar', flag: 'qa', value: 'qa' },
        { key: 're', text: 'Reunion', flag: 're', value: 're' },
        { key: 'ro', text: 'Romania', flag: 'ro', value: 'ro' },
        { key: 'ru', text: 'Russia', flag: 'ru', value: 'ru' },
        { key: 'rw', text: 'Rwanda', flag: 'rw', value: 'rw' },
        { key: 'sh', text: 'Saint Helena', flag: 'sh', value: 'sh' },
        { key: 'kn', text: 'Saint Kitts and Nevis', flag: 'kn', value: 'kn' },
        { key: 'lc', text: 'Saint Lucia', flag: 'lc', value: 'lc' },
        { key: 'pm', text: 'Saint Pierre', flag: 'pm', value: 'pm' },
        { key: 'vc', text: 'Saint Vincent', flag: 'vc', value: 'vc' },
        { key: 'ws', text: 'Samoa', flag: 'ws', value: 'ws' },
        { key: 'sm', text: 'San Marino', flag: 'sm', value: 'sm' },
        { key: 'gs', text: 'Sandwich Islands', flag: 'gs', value: 'gs' },
        { key: 'st', text: 'Sao Tome', flag: 'st', value: 'st' },
        { key: 'sa', text: 'Saudi Arabia', flag: 'sa', value: 'sa' },
        { key: 'gb sct', text: 'Scotland', flag: 'gb sct', value: 'gb sct' },
        { key: 'sn', text: 'Senegal', flag: 'sn', value: 'sn' },
        { key: 'cs', text: 'Serbia', flag: 'cs', value: 'cs' },
        { key: 'rs', text: 'Serbia', flag: 'rs', value: 'rs' },
        { key: 'sc', text: 'Seychelles', flag: 'sc', value: 'sc' },
        { key: 'sl', text: 'Sierra Leone', flag: 'sl', value: 'sl' },
        { key: 'sg', text: 'Singapore', flag: 'sg', value: 'sg' },
        { key: 'sk', text: 'Slovakia', flag: 'sk', value: 'sk' },
        { key: 'si', text: 'Slovenia', flag: 'si', value: 'si' },
        { key: 'sb', text: 'Solomon Islands', flag: 'sb', value: 'sb' },
        { key: 'so', text: 'Somalia', flag: 'so', value: 'so' },
        { key: 'za', text: 'South Africa', flag: 'za', value: 'za' },
        { key: 'kr', text: 'South Korea', flag: 'kr', value: 'kr' },
        { key: 'es', text: 'Spain', flag: 'es', value: 'es' },
        { key: 'lk', text: 'Sri Lanka', flag: 'lk', value: 'lk' },
        { key: 'sd', text: 'Sudan', flag: 'sd', value: 'sd' },
        { key: 'sr', text: 'Suriname', flag: 'sr', value: 'sr' },
        { key: 'sz', text: 'Swaziland', flag: 'sz', value: 'sz' },
        { key: 'se', text: 'Sweden', flag: 'se', value: 'se' },
        { key: 'ch', text: 'Switzerland', flag: 'ch', value: 'ch' },
        { key: 'sy', text: 'Syria', flag: 'sy', value: 'sy' },
        { key: 'tw', text: 'Taiwan', flag: 'tw', value: 'tw' },
        { key: 'tj', text: 'Tajikistan', flag: 'tj', value: 'tj' },
        { key: 'tz', text: 'Tanzania', flag: 'tz', value: 'tz' },
        { key: 'th', text: 'Thailand', flag: 'th', value: 'th' },
        { key: 'tl', text: 'Timorleste', flag: 'tl', value: 'tl' },
        { key: 'tg', text: 'Togo', flag: 'tg', value: 'tg' },
        { key: 'tk', text: 'Tokelau', flag: 'tk', value: 'tk' },
        { key: 'to', text: 'Tonga', flag: 'to', value: 'to' },
        { key: 'tt', text: 'Trinidad', flag: 'tt', value: 'tt' },
        { key: 'tn', text: 'Tunisia', flag: 'tn', value: 'tn' },
        { key: 'tr', text: 'Turkey', flag: 'tr', value: 'tr' },
        { key: 'tm', text: 'Turkmenistan', flag: 'tm', value: 'tm' },
        { key: 'tv', text: 'Tuvalu', flag: 'tv', value: 'tv' },
        { key: 'ae', text: 'United Arab Emirates', flag: 'ae', value: 'ae' },
        { key: 'ug', text: 'Uganda', flag: 'ug', value: 'ug' },
        { key: 'ua', text: 'Ukraine', flag: 'ua', value: 'ua' },
        { key: 'gb', text: 'uk', flag: 'gb', value: 'gb' },
        { key: 'us', text: 'America', flag: 'us', value: 'us' },
        { key: 'uy', text: 'Uruguay', flag: 'uy', value: 'uy' },
        { key: 'um', text: 'US Minor Islands', flag: 'um', value: 'um' },
        { key: 'vi', text: 'US Virgin Islands', flag: 'vi', value: 'vi' },
        { key: 'uz', text: 'Uzbekistan', flag: 'uz', value: 'uz' },
        { key: 'vu', text: 'Vanuatu', flag: 'vu', value: 'vu' },
        { key: 'va', text: 'Vatican City', flag: 'va', value: 'va' },
        { key: 've', text: 'Venezuela', flag: 've', value: 've' },
        { key: 'vn', text: 'Vietnam', flag: 'vn', value: 'vn' },
        { key: 'gb wls', text: 'Wales', flag: 'gb wls', value: 'gb wls' },
        { key: 'wf', text: 'Wallis and Futuna', flag: 'wf', value: 'wf' },
        { key: 'eh', text: 'Western Sahara', flag: 'eh', value: 'eh' },
        { key: 'ye', text: 'Yemen', flag: 'ye', value: 'ye' },
        { key: 'zm', text: 'Zambia', flag: 'zm', value: 'zm' },
        { key: 'zw', text: 'Zimbabwe', flag: 'zw', value: 'zw' },
    ],
};

export { CONFIG };
