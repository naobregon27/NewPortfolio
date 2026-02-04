// Google Analytics Helper Functions

/**
 * Track a custom event
 * @param {string} eventName - Name of the event
 * @param {object} params - Event parameters
 */
export const trackEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  } else {
    console.log('Analytics not loaded - Event:', eventName, params);
  }
};

/**
 * Track page view
 * @param {string} path - Page path
 * @param {string} title - Page title
 */
export const trackPageView = (path, title) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
    });
  }
};

/**
 * Track download event
 * @param {string} fileName - Name of the downloaded file
 */
export const trackDownload = (fileName) => {
  trackEvent('file_download', {
    file_name: fileName,
    link_text: 'Download CV',
  });
};

/**
 * Track outbound link click
 * @param {string} url - Destination URL
 * @param {string} linkText - Text of the link
 */
export const trackOutboundLink = (url, linkText) => {
  trackEvent('click', {
    event_category: 'outbound_link',
    event_label: url,
    link_text: linkText,
  });
};

/**
 * Track form submission
 * @param {string} formName - Name of the form
 */
export const trackFormSubmission = (formName) => {
  trackEvent('form_submission', {
    form_name: formName,
  });
};

/**
 * Track project view
 * @param {string} projectName - Name of the project
 * @param {string} projectId - ID of the project
 */
export const trackProjectView = (projectName, projectId) => {
  trackEvent('project_view', {
    project_name: projectName,
    project_id: projectId,
  });
};

/**
 * Track CTA click
 * @param {string} ctaText - Text of the CTA
 * @param {string} location - Where the CTA was clicked
 */
export const trackCTAClick = (ctaText, location) => {
  trackEvent('cta_click', {
    cta_text: ctaText,
    cta_location: location,
  });
};

export default {
  trackEvent,
  trackPageView,
  trackDownload,
  trackOutboundLink,
  trackFormSubmission,
  trackProjectView,
  trackCTAClick,
};
