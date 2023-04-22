function QRGenerator(bankCode, bankAccount, amount, message) {
  const part12Builder =
    "00" +
    bankCode.length.toString().padStart(2, "0") +
    bankCode +
    "01" +
    bankAccount.length.toString().padStart(2, "0") +
    bankAccount;
  const part11Builder =
    "0010A000000727" +
    "01" +
    part12Builder.length.toString().padStart(2, "0") +
    part12Builder +
    "0208QRIBFTTA";
  const part1Builder =
    "38" + part11Builder.length.toString().padStart(2, "0") + part11Builder;
  const part21Builder =
    "08" + message.length.toString().padStart(2, "0") + message;
  const part2 =
    "5303704" +
    "54" +
    amount.length.toString().padStart(2, "0") +
    amount +
    "5802VN" +
    "62" +
    part21Builder.length.toString().padStart(2, "0") +
    part21Builder;
  const builder = "000201" + "010212" + part1Builder + part2 + "6304";
  const qrcodeContent = builder + generateCheckSum(builder).toUpperCase();
  return qrcodeContent;
}

function generateCheckSum(text) {
  let crc = 0xffff; // initial value
  const polynomial = 0x1021; // 0001 0000 0010 0001 (0, 5, 12)
  const bytes = Buffer.from(text, "utf-8");

  for (const b of bytes) {
    for (let i = 0; i < 8; i++) {
      const bit = (b >> (7 - i)) & 1;
      const c15 = (crc >> 15) & 1;
      crc <<= 1;
      if (c15 ^ bit) crc ^= polynomial;
    }
  }
  return (crc & 0xffff).toString(16).padStart(4, "0");
}

const listBankAvailable = [
  {
    bank_name: "ABBANK - Ngân hàng TMCP An Bình",
    bank_key: "ABBANK",
    bank_code: "970425",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970425.png",
  },
  {
    bank_name: "ACB - NGÂN HÀNG TMCP Á CHÂU",
    bank_key: "ACB",
    bank_code: "970416",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970416.png",
  },
  {
    bank_name: "BAC A BANK - Ngân hàng TMCP Bắc Á",
    bank_key: "BAB",
    bank_code: "970409",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970409.png",
  },
  {
    bank_name: "BAOVIET Bank - Ngân hàng Bảo Việt",
    bank_key: "BAOVIET",
    bank_code: "970438",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970438.png",
  },
  {
    bank_name: "BIDV - Ngân hàng TMCP Đầu tư và Phát triển Việt Nam",
    bank_key: "BIDV",
    bank_code: "970418",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970418.png",
  },
  {
    bank_name: "DongABank - Ngân Hàng TMCP Đông Á",
    bank_key: "DAB",
    bank_code: "970406",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970406.png",
  },
  {
    bank_name: "Eximbank - Ngân hàng TMCP Xuất nhập khẩu Việt Nam",
    bank_key: "EXB",
    bank_code: "970431",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970431.png",
  },
  {
    bank_name: "GPBank - Ngân hàng TM TNHH MTV Dầu Khí Toàn Cầu",
    bank_key: "GPB",
    bank_code: "970408",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970408.png",
  },
  {
    bank_name: "HDBank - Ngân hàng TMCP Phát Triển Thành Phố Hồ Chí Minh",
    bank_key: "HDB",
    bank_code: "970437",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970437.png",
  },
  {
    bank_name: "Hongleong Bank - Ngân hàng TNHH MTV Hongleong Việt Nam",
    bank_key: "HLB",
    bank_code: "970442",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970442.png",
  },
  {
    bank_name: "IVB - Ngân hàng TNHH Indovina",
    bank_key: "INDB",
    bank_code: "970434",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970434.png",
  },
  {
    bank_name: "Kienlongbank - Ngân hàng TMCP Kiên Long",
    bank_key: "kienlongbank",
    bank_code: "970452",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970452.png",
  },
  {
    bank_name: "LienVietPostBank - NGÂN HÀNG TMCP BƯU ĐIỆN LIÊN VIỆT",
    bank_key: "LPB",
    bank_code: "970449",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970449.png",
  },
  {
    bank_name: "MB - Ngân hàng TMCP Quân đội ",
    bank_key: "MB",
    bank_code: "970422",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970422.png",
  },
  {
    bank_name: "MSB - Ngân hàng TMCP Hàng Hải Việt Nam",
    bank_key: "MRTB",
    bank_code: "970426",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970426.png",
  },
  {
    bank_name: "NamABank - Ngân hàng TMCP Nam Á",
    bank_key: "NAB",
    bank_code: "970428",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970428.png",
  },
  {
    bank_name: "NCB -Ngân hàng TMCP Quốc Dân",
    bank_key: "NCB",
    bank_code: "970419",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970419.png",
  },
  {
    bank_name: "OCB - Ngân hàng TMCP Phương Đông",
    bank_key: "OCB",
    bank_code: "970448",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970448.png",
  },
  {
    bank_name: "OceanBank - Ngân hàng TMCP Đại Dương",
    bank_key: "OCEB",
    bank_code: "970414",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970414.png",
  },
  {
    bank_name: "PG Bank - Ngân hàng TMCP Xăng Dầu Petrolimex",
    bank_key: "PGB",
    bank_code: "970430",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970430.png",
  },
  {
    bank_name: "Public Bank - Ngân hàng TNHH MTV Public Việt Nam",
    bank_key: "PUB",
    bank_code: "970439",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970439.png",
  },
  {
    bank_name: "PVcomBank - Ngân hàng TMCP Đại Chúng Việt Nam",
    bank_key: "PVB",
    bank_code: "970412",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970412.png",
  },
  {
    bank_name: "Sacombank - Ngân Hàng TMCP Sài Gòn Thương Tín",
    bank_key: "STB",
    bank_code: "970403",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970403.png",
  },
  {
    bank_name: "Saigonbank - Ngân hàng TMCP Sài Gòn Công Thương ",
    bank_key: "SGB",
    bank_code: "970400",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970400.png",
  },
  {
    bank_name: "SCB - Ngân hàng TMCP Sài Gòn",
    bank_key: "SCB",
    bank_code: "970429",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970429.png",
  },
  {
    bank_name: "SeABank - Ngân hàng TMCP Đông Nam Á",
    bank_key: "SEA",
    bank_code: "970440",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970440.png",
  },
  {
    bank_name: "SHB - Ngân hàng TMCP Sài Gòn – Hà Nội",
    bank_key: "SHB",
    bank_code: "970443",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970443.png",
  },
  {
    bank_name: "Shinhan Bank - Ngân hàng TNHH MTV Shinhan Việt Nam",
    bank_key: "SIB",
    bank_code: "970424",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970424.png",
  },
  {
    bank_name: "Techcombank - Ngân hàng TMCP Kỹ thương Việt Nam",
    bank_key: "TCB",
    bank_code: "970407",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970407.png",
  },
  {
    bank_name: "TPBank - NGÂN HÀNG TIÊN PHONG",
    bank_key: "TPB",
    bank_code: "970423",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970423.png",
  },
  {
    bank_name: "VIB - Ngân hàng quốc tế",
    bank_key: "VIB",
    bank_code: "970441",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970441.png",
  },
  {
    bank_name: "Viet Capital Bank - Ngân hàng TMCP Bản Việt",
    bank_key: "VietCapital",
    bank_code: "970454",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970454.png",
  },
  {
    bank_name: "VietABank - Ngân hàng TMCP Việt Á",
    bank_key: "VAB",
    bank_code: "970427",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970427.png",
  },
  {
    bank_name: "Vietbank - Ngân hàng TMCP Việt Nam Thương Tín",
    bank_key: "VIETB",
    bank_code: "970433",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970433.png",
  },
  {
    bank_name: "Vietcombank - Ngân hàng TMCP Ngoại thương Việt Nam",
    bank_key: "VCB",
    bank_code: "970436",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970436.png",
  },
  {
    bank_name: "VietinBank - Ngân Hàng TMCP Công Thương Việt Nam",
    bank_key: "VTB",
    bank_code: "970415",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970415.png",
  },
  {
    bank_name: "VPBank - Ngân hàng TMCP Việt Nam Thịnh Vượng",
    bank_key: "VPB",
    bank_code: "970432",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970432.png",
  },
  {
    bank_name: "VRB - Ngân hàng Liên Doanh Việt Nga",
    bank_key: "VRB",
    bank_code: "970421",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970421.png",
  },
  {
    bank_name: "Woori Bank - Ngân hàng Wooribank",
    bank_key: "WRB",
    bank_code: "970457",
    logo: "https://s3-ap-southeast-1.amazonaws.com/dashboard.vndc.io/public/payment_method/bank/970457.png",
  },
];

module.exports = { QRGenerator };
