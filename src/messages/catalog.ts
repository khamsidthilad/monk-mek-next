export const LOCALES = ["en", "th", "lo", "ko", "zh"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "locale";

export const messages = {
  en: {
    notFound: {
      badge: "Error 404",
      title: "Page not found",
      description:
        "The page you are looking for does not exist or may have been moved. You can continue from the public home page or jump to the admin dashboard.",
      goHome: "Go Home",
      openDashboard: "Open Dashboard",
    },
    auth: {
      signIn: "Sign in",
      signInNow: "Sign in now",
      credentialsHint: "Enter your credentials to open the dashboard.",
      adminConsole: "ICON LAOS Admin Console",
      couldNotSignIn: "Could not sign in",
      email: "Email",
      password: "Password",
      emailPlaceholder: "name@company.com",
      passwordPlaceholder: "••••••••",
      invalidFormat: "Please provide a valid email and password.",
      invalidCredentials: "Invalid email or password.",
      noAdminAccess: "Your account does not have admin access.",
      signInFailed: "Something went wrong. Please try again.",
    },
    public: {
      home: "Home",
      products: "Products",
      units: "Units",
      gallery: "Gallery",
      contact: "Contact",
    },
    admin: {
      dashboard: "Dashboard",
      products: "Products",
      units: "All Units",
      customers: "Customers",
      orders: "Orders",
      settings: "Settings",
      roleAdmin: "Admin",
      roleSuperAdmin: "Super Admin",
      memberSince: "Member since",
      signOut: "Sign out",
      loading: "Loading...",
    },
  },
  th: {
    notFound: {
      badge: "ข้อผิดพลาด 404",
      title: "ไม่พบหน้านี้",
      description:
        "ไม่พบหน้าที่คุณกำลังค้นหา หรือหน้านี้อาจถูกย้ายแล้ว คุณสามารถกลับไปหน้าแรกหรือไปที่แดชบอร์ดแอดมินได้",
      goHome: "กลับหน้าแรก",
      openDashboard: "เปิดแดชบอร์ด",
    },
    auth: {
      signIn: "เข้าสู่ระบบ",
      signInNow: "เข้าสู่ระบบตอนนี้",
      credentialsHint: "กรอกอีเมลและรหัสผ่านเพื่อเข้าสู่แดชบอร์ด",
      adminConsole: "คอนโซลแอดมิน ICON LAOS",
      couldNotSignIn: "ไม่สามารถเข้าสู่ระบบได้",
      email: "อีเมล",
      password: "รหัสผ่าน",
      emailPlaceholder: "name@company.com",
      passwordPlaceholder: "••••••••",
      invalidFormat: "กรุณากรอกอีเมลและรหัสผ่านให้ถูกต้อง",
      invalidCredentials: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
      noAdminAccess: "บัญชีของคุณไม่มีสิทธิ์เข้าถึงแอดมิน",
      signInFailed: "เกิดข้อผิดพลาด กรุณาลองอีกครั้ง",
    },
    public: {
      home: "หน้าแรก",
      projects: "โครงการ",
      units: "ยูนิต",
      gallery: "แกลเลอรี",
      contact: "ติดต่อ",
    },
    admin: {
      dashboard: "แดชบอร์ด",
      products: "สินค้า",
      units: "ยูนิตทั้งหมด",
      users: "ผู้ใช้",
      orders: "คำสั่งซื้อ",
      settings: "ตั้งค่า",
      roleAdmin: "แอดมิน",
      roleSuperAdmin: "ซูเปอร์แอดมิน",
      memberSince: "สมาชิกตั้งแต่",
      signOut: "ออกจากระบบ",
      loading: "กำลังโหลด...",
    },
  },
  lo: {
    notFound: {
      badge: "ຂໍ້ຜິດພາດ 404",
      title: "ບໍ່ພົບໜ້າ",
      description:
        "ບໍ່ພົບໜ້າທີ່ທ່ານກຳລັງຊອກຫາ ຫຼື ໜ້ານີ້ອາດຖືກຍ້າຍແລ້ວ. ທ່ານສາມາດກັບໄປໜ້າຫຼັກ ຫຼື ໄປທີ່ແດຊບອດແອັດມິນໄດ້",
      goHome: "ກັບໜ້າຫຼັກ",
      openDashboard: "ເປີດແດຊບອດ",
    },
    auth: {
      signIn: "ເຂົ້າລະບົບ",
      signInNow: "ເຂົ້າລະບົບດຽວນີ້",
      credentialsHint: "ໃສ່ຂໍ້ມູນເຂົ້າລະບົບເພື່ອເຂົ້າແດຊບອດ",
      adminConsole: "ICON LAOS Admin Console",
      couldNotSignIn: "ບໍ່ສາມາດເຂົ້າລະບົບໄດ້",
      email: "ອີເມວ",
      password: "ລະຫັດຜ່ານ",
      emailPlaceholder: "name@company.com",
      passwordPlaceholder: "••••••••",
      invalidFormat: "ກະລຸນາໃສ່ອີເມວ ແລະ ລະຫັດຜ່ານໃຫ້ຖືກຕ້ອງ",
      invalidCredentials: "ອີເມວ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ",
      noAdminAccess: "ບັນຊີຂອງທ່ານບໍ່ມີສິດ admin",
      signInFailed: "ມີບັນຫາເກີດຂຶ້ນ ກະລຸນາລອງໃໝ່",
    },
    public: {
      home: "ໜ້າຫຼັກ",
      products: "ສິນຄ້າ",
      units: "ຢູນິດ",
      gallery: "ຄັງຮູບ",
      contact: "ຕິດຕໍ່",
    },
    admin: {
      dashboard: "ແດຊບອດ",
      products: "ສິນຄ້າ",
      units: "ຢູນິດທັງໝົດ",
      users: "ຜູ້ໃຊ້",
      "landing-management": "ຈັດການໜ້າລົງ",
      settings: "ຕັ້ງຄ່າ",
      roleAdmin: "ແອັດມິນ",
      roleSuperAdmin: "ຊູເປີແອັດມິນ",
      memberSince: "ສະມາຊິກຕັ້ງແຕ່",
      signOut: "ອອກຈາກລະບົບ",
      loading: "ກຳລັງໂຫຼດ...",
    },
  },
  ko: {
    notFound: {
      badge: "오류 404",
      title: "페이지를 찾을 수 없습니다",
      description:
        "요청하신 페이지가 없거나 이동되었습니다. 공개 홈으로 이동하거나 관리자 대시보드로 이동할 수 있습니다.",
      goHome: "홈으로 가기",
      openDashboard: "대시보드 열기",
    },
    auth: {
      signIn: "로그인",
      signInNow: "지금 로그인",
      credentialsHint: "대시보드에 접속하려면 자격 정보를 입력하세요.",
      adminConsole: "ICON LAOS 관리자 콘솔",
      couldNotSignIn: "로그인할 수 없습니다",
      email: "이메일",
      password: "비밀번호",
      emailPlaceholder: "name@company.com",
      passwordPlaceholder: "••••••••",
      invalidFormat: "올바른 이메일과 비밀번호를 입력하세요.",
      invalidCredentials: "이메일 또는 비밀번호가 올바르지 않습니다.",
      noAdminAccess: "이 계정에는 관리자 권한이 없습니다.",
      signInFailed: "문제가 발생했습니다. 다시 시도해 주세요.",
    },
    public: {
      home: "홈",
      products: "제품",
      units: "유닛",
      gallery: "갤러리",
      contact: "문의하기",
    },
    admin: {
      dashboard: "대시보드",
      products: "제품",
      units: "전체 유닛",
      users: "사용자",
      "landing-management": "랜딩 관리",
      settings: "설정",
      roleAdmin: "관리자",
      roleSuperAdmin: "슈퍼 관리자",
      memberSince: "가입일",
      signOut: "로그아웃",
      loading: "로딩 중...",
    },
  },
  zh: {
    notFound: {
      badge: "错误 404",
      title: "页面未找到",
      description:
        "您访问的页面不存在或已被移动。您可以返回首页或进入管理后台。",
      goHome: "返回首页",
      openDashboard: "打开后台",
    },
    auth: {
      signIn: "登录",
      signInNow: "立即登录",
      credentialsHint: "输入您的账号信息以进入后台。",
      adminConsole: "ICON LAOS 管理后台",
      couldNotSignIn: "登录失败",
      email: "邮箱",
      password: "密码",
      emailPlaceholder: "name@company.com",
      passwordPlaceholder: "••••••••",
      invalidFormat: "请输入有效的邮箱和密码。",
      invalidCredentials: "邮箱或密码错误。",
      noAdminAccess: "您的账号没有管理员权限。",
      signInFailed: "出现问题，请重试。",
    },
    public: {
      home: "首页",
      products: "产品",
      units: "单位",
      gallery: "图库",
      contact: "联系",
    },
    admin: {
      dashboard: "控制面板",
      products: "产品",
      units: "所有单位",
      users: "用户",
      "landing-management": "落地页管理",
      settings: "设置",
      roleAdmin: "管理员",
      roleSuperAdmin: "超级管理员",
      memberSince: "加入时间",
      signOut: "退出登录",
      loading: "加载中...",
    },
  },
} as const;

export type MessagesByLocale = (typeof messages)[Locale];

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

export function resolveLocale(value: unknown): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export function getMessage(locale: Locale, key: string): string {
  const tokens = key.split(".");
  let node: unknown = messages[locale];

  for (const token of tokens) {
    if (typeof node !== "object" || node === null || !(token in node)) {
      return key;
    }
    node = (node as Record<string, unknown>)[token];
  }

  return typeof node === "string" ? node : key;
}
