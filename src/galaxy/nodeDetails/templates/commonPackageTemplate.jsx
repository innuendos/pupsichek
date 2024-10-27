import React from 'react';
export default commonPackageTemplate;

function commonPackageTemplate(model, link, linkText) {
  return (
    <div className='container-fluid row'>
      <div className='hidden-xs'>
        <div className='col-xs-6'>
          <a href={link} target='_blank'>
            <h4 title=HERE3>HERE2</h4>
          </a>
        </div>
      </div>
      <div className='visible-xs-block'>
        <div className='row info-block'>
          <div className='col-xs-6 no-overflow'><a href={link} target="_blank">HEREE</a></div>
        </div>
      </div>
    </div>
  );
}