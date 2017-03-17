exports.MEDIA_URL = '/static/';
exports.URL_PRE_PATH_FOR_PACKAGED_APPS = '';

exports.APPCACHE_ENABLED = false;
exports.FULL_OFFLINE_ENABLED = true;

exports.APPCACHE_ID = "2016-07-14 09:48:58.770112";
exports.SOURCE_VERSION = "20160712181301";

exports.ON_DEVELOPMENT_SERVER = false;

exports.STRIPE_PUBLIC_KEY = "pk_CmKpB4xe07hPbOxu5RHgJu5kpaStP";

exports.LOG_DEBUG_MESSAGES = false;

exports.USER_IS_LEFT = false;
exports.DEMO_MODE = false;
exports.EMBED = false;

exports.THEME_OPTIONS = [{"pretty_name": "Default", "font": "default", "type": "theme", "name": "default", "is_free": true}, {"pretty_name": "Dark", "font": "lucidagrande", "type": "theme", "name": "dark", "is_free": false}, {"pretty_name": "Wood", "font": "courier", "type": "theme", "name": "wood", "is_free": false}, {"pretty_name": "Steel", "font": "helvetica_light", "type": "theme", "name": "steel", "is_free": false}, {"pretty_name": "Minimal", "font": "helvetica_light", "type": "theme", "name": "light", "is_free": false}, {"pretty_name": "Space", "font": "helvetica_light", "type": "theme", "name": "space", "is_free": false}, {"pretty_name": "Hacker", "font": "andale", "type": "theme", "name": "hacker", "is_free": false}];

exports.FONT_OPTIONS = [{"pretty_name": "Sans-serif", "font_styles": "font-family:'Helvetica Neue', Arial, Sans-serif;font-weight:normal;", "type": "font", "name": "default", "is_free": true}, {"pretty_name": "Serif", "font_styles": "font-family:Georgia, Times, serif;font-weight:normal;", "type": "font", "name": "times", "is_free": true}, {"pretty_name": "Light", "font_styles": "font-family:'Helvetica Neue', Arial, Sans-serif;font-weight:300;", "type": "font", "name": "helvetica_light", "is_free": false}, {"pretty_name": "Typewriter", "font_styles": "font-family:Courier, Monospace;font-weight:normal;", "type": "font", "name": "courier", "is_free": false}, {"pretty_name": "Terminal", "font_styles": "font-family:\"Andale Mono\", Monospace;font-weight:normal;", "type": "font", "name": "andale", "is_free": false}, {"pretty_name": "Interface", "font_styles": "font-family:\"Lucida Grande\", \"Lucida Sans Unicode\";font-weight:normal;", "type": "font", "name": "lucidagrande", "is_free": false}];

exports.GUIDE_ID = false;


exports.FIRST_LOAD_FLAGS = {
  showProWelcome: false,
  showFriendRecommendation: false,
  showPrivateSharingNotice: false,
  showNewUserTutorial: false,
  showUpgradeDialog: false,
  isNewUser: false
};

// Data structure for holding settings. We overwrite the null 'value's
// with the actual settings when we get them in the initialization
// data.
exports.SETTINGS = {
  theme: { value: null, isFlag: false, saveToClient: true, saveToServer: true },
  font: { value: null, isFlag: false, saveToClient: true, saveToServer: true },
  show_keyboard_shortcuts: { value: null, isFlag: true, saveToClient: true, saveToServer: true },
  unsubscribe_from_summary_emails: { value: null, isFlag: true, saveToClient: true, saveToServer: true },
  backup_to_dropbox: { value: null, isFlag: true, saveToClient: true, saveToServer: true },
  email: { value: null, isFlag: false, saveToClient: true, saveToServer: false },
  username: { value: null, isFlag: false, saveToClient: true, saveToServer: false },
  last_seen_message_json_string: { value: null, isFlag: false, saveToClient: true, saveToServer: true },
  saved_views_json: { value: null, isFlag: false, saveToClient: true, saveToServer: true },
  auto_hide_left_bar: { value: null, isFlag: true, saveToClient: true, saveToServer: true }
};

exports.IS_PACKAGED_APP = false;
exports.IS_CHROME_APP = false;
exports.IS_ANDROID_APP = false;

exports.NO_ANIMATIONS = true;
exports.READ_ONLY_MAIN_TREE = false;

exports.IS_MOBILE = false;
exports.IS_TABLET = false;
exports.IS_IOS = false;
exports.IOS_VERSION = null;
exports.IS_IE = false;
exports.IE_VERSION = null;
exports.IS_ANDROID = false;
exports.IS_FIREFOX = true;
exports.IS_CHROME = false;
exports.IS_SAFARI = false;

exports.CLIENT_VERSION = 17;
exports.IS_WINDOWS = null;
exports.IS_MAC_OS = null;
exports.IS_LINUX = null;
exports.IS_CHROME_OS = null;
exports.WINDOW_ID = null;
exports.MOST_RECENTLY_OPENED_WINDOW_ID_KEY = "mostRecentlyOpenedWindowId";
exports.TIMEZONE_INFO = null;
exports.SHOW_COMPLETED = true;
exports.TIMEOUTS = {};
exports.CURRENTLY_ACTIVE_PAGE = null;
exports.DRAG_MODE = false;
exports.TRACK_TAG_COUNTS = true;
exports.WINDOW_FOCUSED = true;
exports.WORD_CHARS = "\\p{L}";
exports.WORD_CHARS_PLUS_DIGITS = exports.WORD_CHARS + "\\p{Nd}";
exports.TEXT_ENTITY_BOUNDARY_CHARS = "[(),.!?';:\\/\\[\\]]";
exports.NAVIGABLE_PROJECTS_PATTERN = ".project:visible:not(.parent, .mainTreeRoot)";
exports.DROP_TARGET_PATTERN = exports.NAVIGABLE_PROJECTS_PATTERN + ", .childrenEnd:visible";
exports.GLOBAL_NAVIGABLE_PROJECTS_PATTERN = ".page.active " + exports.NAVIGABLE_PROJECTS_PATTERN;
exports.DO_NOT_INITIALIZE = false;
exports.READY_FOR_DOCUMENT_READY = false;
exports.DOCUMENT_READY_TRIGGERED = false;
exports.CONTENT_HTML_CONTAINER = null;
exports.SHORTCUT_KEYS = null;
exports.SHORTCUT_KEYS_WITH_META = null;
exports.SHORTCUT_KEYS_FOR_MOVING = null;
exports.SHORTCUT_KEYS_FOR_MOVING_WITH_META = null;
exports.FORMAT_FLAGS = null;
exports.LAST_CONTENT_FOCUS_TIMESTAMP = null;
exports.NUM_DELETED_ITEMS_NEEDED_FOR_DROPDOWN_MESSAGE = 10;
exports.LAST_UP_OR_DOWN_ARROW_IN_NAME_USED_DEFAULT_BEHAVIOR = false;
exports.USE_ANDROID_CHROME_BACKSPACE_HACK = null;
exports.USE_ANDROID_CHROME_ENTER_HACK = null;

