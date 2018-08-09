import { UserManager } from 'oidc-client';
import { getClientSettings } from './authentication.service';

export let UserManagerFactory = () => {
    return new UserManager(getClientSettings());
};
