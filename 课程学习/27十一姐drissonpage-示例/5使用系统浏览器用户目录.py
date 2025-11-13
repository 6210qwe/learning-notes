from DrissionPage import Chromium, ChromiumOptions

co = ChromiumOptions().use_system_user_path()
browser = Chromium(co)