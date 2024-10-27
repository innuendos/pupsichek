/**
 * This component shows basic navigation help. The idea is to show it only
 * first time when user opens. All subsequent page opening should not trigger
 * help screen.
 *
 * The only possible way to show help again is by triggerign "show help"
 * action, which is currently bound to mouse wheel event
 */
import React from 'react';
import appEvents from './service/appEvents.js';
import Key from './utils/key.js';

export default require('maco')(help, React);

var helpWasShown = false;

function help(x) {
  var graphDownloaded = false;

  x.render = function() {
    if (window.orientation !== undefined) {
      // no need to show help on orientation enabled devices
      return null;
    }

    if (helpWasShown) {
      // no need to annoy people
      return null;
    }

    if (!graphDownloaded) {
      // Show help only after all is downloaded
      return null;
    }

    return (
        <div className='navigation-help'>
          <h3>Пупсиченские управления</h3>
            <table><tbody>
      <tr>
      <td><code>W</code></td>
      <td>Вперед</td>
      </tr>
      <tr>
      <td><code>S</code></td>
      <td>Назад</td>
      </tr>
      <tr>
      <td><code>A</code></td>
      <td>Налево</td>
      </tr>
      <tr>
      <td><code>D</code></td>
      <td>Направо</td>
      </tr>
      <tr>
      <td><code>R</code></td>
      <td>Выше</td>
      </tr>
      <tr>
      <td><code>F</code></td>
      <td>Ниже</td>
      </tr>
      <tr>
      <td><code>spacebar</code></td>
      <td>Управлять камерой</td>
      </tr>
      <tr>
      <td><code>shift</code></td>
      <td>Летать быстрее</td>
      <td><code></code></td>
      <td></td>
      </tr>
      </tbody></table>
        </div>
        );
    };

  x.componentDidMount = function () {
    if (window.orientation !== undefined) return;
    appEvents.graphDownloaded.on(showHelpIfNeeded);
    appEvents.downloadGraphRequested.on(resetHelp);
    appEvents.toggleHelp.on(toggleHelp);

    listenToKeys();
    listenToWheel();
  }

  x.componentWillUnmount = function () {
    if (window.orientation !== undefined) return;
    appEvents.graphDownloaded.off(showHelpIfNeeded);
    appEvents.downloadGraphRequested.off(resetHelp);
    appEvents.toggleHelp.off(toggleHelp);

    releaseKeyListener();
    releaseWheel();
  }

  function showHelpIfNeeded() {
    if (helpWasShown) return;
    graphDownloaded = true;

    x.forceUpdate();
  }

  function toggleHelp() {
    helpWasShown = !helpWasShown;
    x.forceUpdate();
  }

  function resetHelp() {
    graphDownloaded = false;
    x.forceUpdate();
  }

  function handlekey(e) {
    if (Key.isModifier(e)) {
      // ignore modifiers
      return;
    }
    var needsUpdate = !helpWasShown;
    helpWasShown = true;

    if (needsUpdate) {
      x.forceUpdate();
    }
  }

  function handlewheel(e) {
    // only show when used on scene
    if (e.target && e.target.nodeName === 'CANVAS') {
      helpWasShown = false;
      x.forceUpdate();
      appEvents.focusScene.fire();
    }
  }

  function listenToKeys() {
    document.body.addEventListener('keydown', handlekey);
  }

  function listenToWheel() {
    document.body.addEventListener('wheel', handlewheel, true);
  }

  function releaseKeyListener() {
    document.body.removeEventListener('keydown', handlekey, true);
  }

  function releaseWheel() {
    document.body.removeEventListener('wheel', handlewheel, true);
  }
}
