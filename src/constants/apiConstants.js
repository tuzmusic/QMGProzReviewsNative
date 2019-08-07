export const ApiUrls = {};

const url = (...components: string[]) => components.join("/");

const baseUrl = "https://www.prozreviews.com";
const jsonApiBase = url(baseUrl, "t5ej61G4r62301i");
const customApiBase = url(baseUrl, "wp-json", "api/v2");

ApiUrls.login = url(jsonApiBase, "user/generate_auth_cookie");
ApiUrls.nonce = url(jsonApiBase, "get_nonce/?controller=user&method=register");
ApiUrls.register = url(jsonApiBase, "user/register");
("https://www.prozreviews.com/t5ej61G4r62301i/user/register");
ApiUrls.logout = url(baseUrl, "wp-json/auth/logout");

ApiUrls.getNonce = url(jsonApiBase, "get_nonce");
ApiUrls.createPostJsonApi = url(jsonApiBase, "posts", "create_post");
ApiUrls.createCustomer = url(customApiBase, "customers");
