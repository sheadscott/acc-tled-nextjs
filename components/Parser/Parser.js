import React from 'react';
import HTMLParser from 'html-react-parser';
import domToReact from 'html-react-parser/lib/dom-to-react';
import Link from 'next/link';
import MediaContainer from '../MediaContainer/MediaContainer';
import { siteUrl } from '../../config';

const parseContent = content =>
  HTMLParser(content, {
    replace({ name, attribs, children }) {
      if (name === 'a' && attribs.href) {
        // console.log(attribs);
        const url = attribs.href.match(/\/uploads\//) ? attribs.href : attribs.href.replace(`${siteUrl}/`, '/');
        if (attribs.target === '_blank') {
          return (
            <Link href={url}>
              <a className={attribs.class} target="_blank" rel="noopener">
                {domToReact(children)}
              </a>
            </Link>
          );
        }
        return (
          <Link href={url}>
            <a className={attribs.class}>{domToReact(children)}</a>
          </Link>
        );
      }

      if (name === 'iframe') {
        attribs.style = { border: 'none' };

        if (attribs.hasOwnProperty('class')) {
          delete attribs.class;
        }

        if (attribs.hasOwnProperty('allowfullscreen')) {
          attribs.allowFullScreen = true;
          delete attribs.allowfullscreen;
        }

        if (attribs.hasOwnProperty('frameborder')) {
          attribs.frameBorder = attribs.frameborder;
          delete attribs.frameborder;
        }
        return (
          <MediaContainer ratio="53%">
            {mediaLoaded => <iframe title="iframe content" onLoad={mediaLoaded} {...attribs} />}
          </MediaContainer>
        );
      }
    },
  });

const Parser = props => <React.Fragment>{parseContent(props.children)}</React.Fragment>;

export default Parser;
