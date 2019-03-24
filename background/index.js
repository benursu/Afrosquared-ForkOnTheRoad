const puppeteer = require("puppeteer");

exports.handler = async (event, ctx, callback) => {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    args: [
      "--disable-dev-shm-usage",
      "--no-zygote",
      "--use-gl=swiftshader",
      "--enable-webgl",
      "--hide-scrollbars",
      "--mute-audio",
      "--no-sandbox",
      "--single-process",
      "--disable-breakpad",
      "--ignore-gpu-blacklist",
      "--headless"
    ],
    executablePath: "./headless_chromium/headless_shell"
  });

	let size = 'large';
	let choice0 = '';
	let choice1 = '';
	let choice2 = '';
	let choice3 = '';
        let picked = '';
    	if (event.queryStringParameters !== null && event.queryStringParameters !== undefined) {
        	if (event.queryStringParameters.size !== undefined && event.queryStringParameters.size !== null && event.queryStringParameters.size !== "") {
            		size = event.queryStringParameters.size;
        	}
        	if (event.queryStringParameters.choice0 !== undefined && event.queryStringParameters.choice0 !== null && event.queryStringParameters.choice0 !== "") {
            		choice0 = event.queryStringParameters.choice0;
        	}
        	if (event.queryStringParameters.choice1 !== undefined && event.queryStringParameters.choice1 !== null && event.queryStringParameters.choice1 !== "") {
            		choice1 = event.queryStringParameters.choice1;
        	}
        	if (event.queryStringParameters.choice2 !== undefined && event.queryStringParameters.choice2 !== null && event.queryStringParameters.choice2 !== "") {
            		choice2 = event.queryStringParameters.choice2;
        	}
        	if (event.queryStringParameters.choice3 !== undefined && event.queryStringParameters.choice3 !== null && event.queryStringParameters.choice3 !== "") {
            		choice3 = event.queryStringParameters.choice3;
        	}
        	if (event.queryStringParameters.picked !== undefined && event.queryStringParameters.picked !== null && event.queryStringParameters.picked !== "") {
            		picked = event.queryStringParameters.picked;
        	}
	}

	let width = 1280;
	let height = 800;
	if(size == 'medium'){
		width = 1024;
		height = 600;
	}else if(size == 'small'){
		width = 480;
		height = 480;
	}

  const page = await browser.newPage();
  await page.setViewport({ width: width, height: height });
  //await page.mainFrame().waitForSelector('.done');
  await page.goto("https://s3.amazonaws.com/afrosquared-forkintheroad/web/index.html?size=" + size + "&choice0=" + choice0 + "&choice1=" + choice1 + "&choice2=" + choice2 + "&choice3=" + choice3 + "&picked=" + picked);

	await page.waitForSelector('#loadedComplete', { visible: true });

  const screenshot = await page.screenshot();

  const body = screenshot.toString("base64");
  const response = {
    statusCode: 200,
    headers: { "Content-Type": "image/png" },
    body,
    isBase64Encoded: true
  };
  await browser.close();

  callback(null, response);
};
