import { request } from '../lib/datocms';

const SETTINGS_QUERY = `query SettingsQuery {
    settingsPage {
        title
        id
    }
}`;

export const getSettingsPageData = async () => {
    const data = await request({
        query: SETTINGS_QUERY
    });

    return data;
}
  