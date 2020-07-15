export function signupConfirmationEmailLayout({
  heading,
  greeting,
  message,
  link,
  buttonText,
  directLinkText,
  note,
  meta
}) {
  return (
    `
    <mjml>
      <mj-head>
        <mj-raw>
          <meta name="keywords" content="${meta.keywords}" />
          <meta name="description" content="${meta.description}" />
        </mj-raw>
      </mj-head>
      <mj-body>
        <mj-container>

          <mj-section>
            <mj-column>
              <mj-text font-size="20px" color="#333333" font-family="sans-serif">
                ${heading}
              </mj-text>
            </mj-column>
          </mj-section>

          <mj-section>
            <mj-column>
              <mj-text color="#333333">
                ${greeting}
              </mj-text>
              <mj-text color="#333333">
                ${message}
              </mj-text>
              <mj-button background-color="#0a8f1b" href="${link}">
                ${buttonText}
              </mj-button>
            </mj-column>
          </mj-section>

          <mj-section>
            <mj-column>
              <mj-text color="#333333">
                ${directLinkText}
              </mj-text>
              <mj-text align="center" color="#333333">
                <a href="${link}">
                  ${link}
                </a>
              </mj-text>
              <mj-text color="#333333">
                ${note}
              </mj-text>
            </mj-column>
          </mj-section>

        </mj-container>
      </mj-body>
    </mjml>
    `
  );
}

export function resetPasswordEmailLayout({
  heading,
  greeting,
  message,
  link,
  tokenText,
  urlMessage,
  buttonText,
  note,
  meta
}) {
  return (
    `
    <mjml>
      <mj-head>
        <mj-raw>
          <meta name="keywords" content="${meta.keywords}" />
          <meta name="description" content="${meta.description}" />
        </mj-raw>
      </mj-head>
      <mj-body>
        <mj-container>

          <mj-section>
            <mj-column>
              <mj-text font-size="20px" color="#333333" font-family="sans-serif">
                ${heading}
              </mj-text>
            </mj-column>
          </mj-section>

          <mj-section>
            <mj-column>
              <mj-text color="#333333">
                ${greeting}
              </mj-text>
              <mj-text color="#333333">
                ${message}
              </mj-text>
              <mj-button background-color="#666">
                ${tokenText}
              </mj-button>
            </mj-column>
          </mj-section>

          <mj-section>
            <mj-column>
            <mj-text color="#333333">
                ${urlMessage}
              </mj-text>
              <mj-button background-color="#0a8f1b" href="${link}">
                ${buttonText}
              </mj-button>
              <mj-text color="#333333">
                ${note}
              </mj-text>
            </mj-column>
          </mj-section>

        </mj-container>
      </mj-body>
    </mjml>
    `
  );
}

export function passwordChangedEmailLayout({
  heading,
  greeting,
  message,
  greeting2,
  meta
}) {
  return (
    `
    <mjml>
      <mj-head>
        <mj-raw>
          <meta name="keywords" content="${meta.keywords}" />
          <meta name="description" content="${meta.description}" />
        </mj-raw>
      </mj-head>
      <mj-body>
        <mj-container>

          <mj-section>
            <mj-column>
              <mj-text font-size="20px" color="#333333" font-family="sans-serif">
                ${heading}
              </mj-text>
            </mj-column>
          </mj-section>

          <mj-section>
            <mj-column>
              <mj-text color="#333333">
                ${greeting}
              </mj-text>
              <mj-text color="#333333">
                ${message}
              </mj-text>
            </mj-column>
          </mj-section>

          <mj-section>
            <mj-column>
              <mj-text color="#333333">
                ${greeting2}
              </mj-text>
            </mj-column>
          </mj-section>

        </mj-container>
      </mj-body>
    </mjml>
    `
  );
}
