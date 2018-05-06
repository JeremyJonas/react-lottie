import React from 'react';
import { mount } from 'enzyme';
import ReactLottie from '../src/index';
import animationData from '../stories/beating-heart.json';
import animationData2 from '../stories/pinjump.json';

describe('react-lottie', () => {
  describe('clickToPause', () => {
    test('should not trigger pause by default', () => {
      const wrapper = mount(<ReactLottie animationData={animationData} />);
      const _handleClick = jest.fn();

      wrapper.instance()._handleClick = _handleClick;
      wrapper.instance().forceUpdate();
      wrapper.find('div').at(0).simulate('click');

      expect(_handleClick).not.toHaveBeenCalled();
    });
    test('should trigger pause when true', () => {
      const wrapper = mount(<ReactLottie animationData={animationData} clickToPause />);
      const _handleClick = jest.fn();

      wrapper.instance()._handleClick = _handleClick;
      wrapper.instance().forceUpdate();
      wrapper.find('div').at(0).simulate('click');

      expect(_handleClick).toHaveBeenCalled();
    });
  });

  describe('ariaRole, ariaLabel, and title', () => {
    test('should set the aria role correctly', () => {
      const wrapper = mount(<ReactLottie
        animationData={animationData}
        ariaRole="test"
        ariaLabel="testlabel"
        title="title"
      />);

      expect(wrapper.find('div').prop('role')).toBe('test');
      expect(wrapper.find('div').prop('aria-label')).toBe('testlabel');
      expect(wrapper.find('div').prop('title')).toBe('title');
    });
    test('should default animation.name to title', () => {
      const wrapper = mount(<ReactLottie
        animationData={animationData}
        title="title"
      />);

      expect(wrapper.instance().animation.name).toBe('title');
    });
  });

  describe('style', () => {
    describe('className', () => {
      test('should set className on containing div', () => {
        const className = 'foo';
        const wrapper = mount(<ReactLottie
          animationData={animationData}
          className={className}
        />);

        expect(wrapper.find('div').prop('className')).toEqual(className);
      });
    });
    describe('inline', () => {
      test('should set style on containing div', () => {
        const style = { background: 'red' };
        const wrapper = mount(<ReactLottie
          animationData={animationData}
          style={style}
        />);

        expect(wrapper.find('div').prop('style')).toEqual(style);
      });
    });
    describe('height and width', () => {
      test('should be able to set directly with props', () => {
        const wrapper = mount(<ReactLottie
          animationData={animationData}
          height={100}
          width={200}
        />);

        expect(wrapper.find('div').prop('style').height).toBe(100);
        expect(wrapper.find('div').prop('style').width).toBe(200);
      });
      test('should be able to set with inline style prop', () => {
        const wrapper = mount(<ReactLottie
          animationData={animationData}
          style={{ height: 100, width: 200 }}
        />);

        expect(wrapper.find('div').prop('style').height).toBe(100);
        expect(wrapper.find('div').prop('style').width).toBe(200);
      });
      test('should have height/width props take precedence over inline values', () => {
        const wrapper = mount(<ReactLottie
          animationData={animationData}
          height={111}
          width={222}
          style={{ height: 100, width: 200 }}
        />);

        expect(wrapper.find('div').prop('style').height).toBe(111);
        expect(wrapper.find('div').prop('style').width).toBe(222);
      });
    });
  });

  describe('controlled props', () => {
    describe('animationData', () => {
      test('should load animationData', () => {
        const spy = jest.spyOn(ReactLottie.prototype, '_loadAnimation');
        const wrapper = mount(<ReactLottie animationData={animationData} />);

        expect(ReactLottie.prototype._loadAnimation).toHaveBeenCalledTimes(1);
        expect(wrapper.instance().animation.animationData).toBe(animationData);

        spy.mockReset();
        spy.mockRestore();
      });
      test('should reload animationData when updated', () => {
        const spy = jest.spyOn(ReactLottie.prototype, '_loadAnimation');
        const wrapper = mount(<ReactLottie animationData={animationData} />);

        expect(ReactLottie.prototype._loadAnimation).toHaveBeenCalledTimes(1);
        expect(wrapper.instance().animation.animationData).toBe(animationData);

        wrapper.setProps({
          animationData: animationData2,
        });

        expect(ReactLottie.prototype._loadAnimation).toHaveBeenCalledTimes(2);
        expect(wrapper.instance().animation.animationData).toBe(animationData2);

        spy.mockReset();
        spy.mockRestore();
      });
    });
    describe('speed', () => {
      test('should load speed', () => {
        const speed = 3;
        const wrapper = mount(<ReactLottie animationData={animationData} speed={speed} />);

        expect(wrapper.instance().animation.playSpeed).toBe(speed);
      });
      test('should update speed', () => {
        const wrapper = mount(<ReactLottie animationData={animationData} />);
        expect(wrapper.instance().animation.playSpeed).toBe(1);

        const speed = 3;
        wrapper.setProps({ speed });
        expect(wrapper.instance().animation.playSpeed).toBe(speed);
      });
    });
    describe('direction', () => {
      test('should load direction', () => {
        const direction = -1;
        const wrapper = mount(<ReactLottie animationData={animationData} direction={direction} />);

        expect(wrapper.instance().animation.playDirection).toBe(direction);
      });
      test('should update direction', () => {
        const wrapper = mount(<ReactLottie animationData={animationData} />);
        expect(wrapper.instance().animation.playDirection).toBe(1);

        const direction = -1;
        wrapper.setProps({ direction });
        expect(wrapper.instance().animation.playDirection).toBe(direction);
      });
    });
    describe('loop', () => {
      test('should load loop', () => {
        const loop = 4;
        const wrapper = mount(<ReactLottie animationData={animationData} loop={loop} />);

        expect(wrapper.instance().animation.loop).toBe(loop);
      });
      test('should update loop', () => {
        const wrapper = mount(<ReactLottie animationData={animationData} />);
        expect(wrapper.instance().animation.loop).toBeFalsy();

        const loop = 4;
        wrapper.setProps({ loop });
        expect(wrapper.instance().animation.loop).toBe(loop);
      });
    });
    describe('segments', () => {
      test('should load segments', () => {
        const segments = [0, 2];
        const spy = jest.fn();
        const setAnimationRef = (ref) => {
          ref.playSegments = spy; // eslint-disable-line no-param-reassign
        };
        mount(<ReactLottie
          animationData={animationData}
          segments={segments}
          animationRef={setAnimationRef}
        />);

        expect(spy).toHaveBeenCalledWith(segments, true);
      });
      test('should update segments', () => {
        const wrapper = mount(<ReactLottie animationData={animationData} />);
        expect(wrapper.instance().animation.segments).toEqual([]);

        const segments = [0, 2];
        wrapper.setProps({ segments });
        expect(wrapper.instance().animation.segments).toEqual([segments]);
      });
    });
  });

  describe('should proxy uncontrolled properties to loadAnimation options', () => {
    test('autoplay', () => {
      const autoplay = false;
      const wrapper = mount(<ReactLottie animationData={animationData} autoplay={autoplay} />);

      expect(wrapper.instance().animation.autoplay).toBe(autoplay);
    });
    test('assetsPath', () => {
      const assetsPath = '/foo/bar';
      const wrapper = mount(<ReactLottie animationData={animationData} assetsPath={assetsPath} />);

      expect(wrapper.instance().animation.assetsPath).toBe(assetsPath);
    });
  });

  describe('event listeners', () => {
    describe('register/unregister', () => {
      test('should register/unregister events on mount/unmount respectively', () => {
        const eventListeners = [
          { eventName: 'enterFrame', callback: jest.fn() },
        ];
        const registerSpy = jest.spyOn(ReactLottie.prototype, '_registerEvents');
        const unregisterSpy = jest.spyOn(ReactLottie.prototype, '_unregisterEvents');
        const wrapper = mount(<ReactLottie
          animationData={animationData}
          eventListeners={eventListeners}
        />);

        expect(ReactLottie.prototype._registerEvents).toHaveBeenCalledWith(eventListeners);
        expect(ReactLottie.prototype._unregisterEvents).not.toHaveBeenCalled();

        wrapper.unmount();

        expect(ReactLottie.prototype._unregisterEvents).toHaveBeenCalledWith(eventListeners);

        registerSpy.mockReset();
        registerSpy.mockRestore();
        unregisterSpy.mockReset();
        unregisterSpy.mockRestore();
      });

      test('should only unregister listeners registered by component', (done) => {
        const onCompleteA = jest.fn();
        const onCompleteB = jest.fn();
        const onEnterFrameA = jest.fn();
        const onEnterFrameB = jest.fn();
        const eventListeners = [
          { eventName: 'enterFrame', callback: onEnterFrameA },
        ];
        const spy = jest.spyOn(ReactLottie.prototype, '_registerEvents');
        let animationRef = null;
        const setAnimationRef = (animation) => {
          animationRef = animation;
        };
        const wrapper = mount(<ReactLottie
          animationData={animationData}
          eventListeners={eventListeners}
          onComplete={onCompleteA}
          animationRef={setAnimationRef}
        />);

        setTimeout(() => {
          animationRef.onComplete = onCompleteB;
          animationRef.addEventListener('enterFrame', onEnterFrameB);

          expect(ReactLottie.prototype._registerEvents).toHaveBeenCalledWith(eventListeners);
          wrapper.instance()._unregisterEvents(eventListeners);
          // doesn't remove direct event listeners
          expect(animationRef.onComplete).toBe(onCompleteB);
          // doesn't remove named event listeners
          expect(animationRef._cbs.enterFrame).toContainEqual(onEnterFrameB);

          spy.mockReset();
          spy.mockRestore();
          done();
        });
      });
    });

    describe('DOMLoaded', () => {
      test('should receive `DOMLoaded` event', (done) => {
        const callback = (event) => {
          expect(event).not.toBeDefined();
          done();
        };
        const eventListeners = [
          { eventName: 'DOMLoaded', callback },
        ];
        mount(<ReactLottie
          animationData={animationData}
          eventListeners={eventListeners}
        />);
      });
    });

    describe('enterFrame', () => {
      test('should receive `enterFrame` event', (done) => {
        const callback = (event) => {
          expect(event).toEqual(expect.objectContaining({ type: 'enterFrame' }));
          done();
        };
        const eventListeners = [
          { eventName: 'enterFrame', callback },
        ];
        mount(<ReactLottie
          animationData={animationData}
          eventListeners={eventListeners}
        />);
      });
    });

    describe('onEnterFrame', () => {
      test('should receive `enterFrame` event', (done) => {
        const callback = (event) => {
          expect(event).toEqual(expect.objectContaining({ type: 'enterFrame' }));
          done();
        };
        mount(<ReactLottie
          animationData={animationData}
          onEnterFrame={callback}
        />);
      });
    });

    describe('complete', () => {
      test('should receive `complete` event', (done) => {
        const eventListeners = [
          {
            eventName: 'complete',
            callback: (event) => {
              expect(event).toEqual(expect.objectContaining({ type: 'complete' }));
              done();
            },
          },
        ];
        mount(<ReactLottie
          animationData={animationData}
          eventListeners={eventListeners}
        />);
      });
    });

    describe('onComplete', () => {
      test('should receive `complete` event', (done) => {
        const onComplete = (event) => {
          expect(event).toEqual(expect.objectContaining({ type: 'complete' }));
          done();
        };
        mount(<ReactLottie
          animationData={animationData}
          onComplete={onComplete}
        />);
      });
    });

    describe('loopComplete', () => {
      test('should receive `loopComplete` event', (done) => {
        const eventListeners = [
          {
            eventName: 'loopComplete',
            callback: (event) => {
              expect(event).toEqual(expect.objectContaining({ type: 'loopComplete' }));
              done();
            },
          },
        ];
        mount(<ReactLottie
          animationData={animationData}
          eventListeners={eventListeners}
          loop
        />);
      });
    });

    describe('onLoopComplete', () => {
      test('should receive `loopComplete` event', (done) => {
        const callback = (event) => {
          expect(event).toEqual(expect.objectContaining({ type: 'loopComplete' }));
          done();
        };
        mount(<ReactLottie
          animationData={animationData}
          onLoopComplete={callback}
          loop
        />);
      });
    });

    describe('segmentStart', () => {
      test('should receive `segmentStart` event', (done) => {
        const callback = (event) => {
          expect(event).toEqual(expect.objectContaining({ type: 'segmentStart' }));
          done();
        };
        const eventListeners = [
          { eventName: 'segmentStart', callback },
        ];
        mount(<ReactLottie
          animationData={animationData}
          eventListeners={eventListeners}
          segments={[1, 10]}
        />);
      });
    });

    describe('onSegmentStart', () => {
      test('should receive `segmentStart` event', (done) => {
        const callback = (event) => {
          expect(event).toEqual(expect.objectContaining({ type: 'segmentStart' }));
          done();
        };
        mount(<ReactLottie
          animationData={animationData}
          onSegmentStart={callback}
          segments={[1, 10]}
        />);
      });
    });
  });

  describe('componentDidMount', () => {
    test('should create animation', () => {
      const wrapper = mount(<ReactLottie animationData={animationData} />);

      expect(wrapper.instance().animation).toBeDefined();
    });
  });

  describe('componentDidUnmount', () => {
    test('should destroy animation', () => {
      const spy = jest.fn();
      const wrapper = mount(<ReactLottie animationData={animationData} />);
      const instance = wrapper.instance();
      instance.animation.destroy = spy;

      wrapper.unmount();

      expect(spy).toHaveBeenCalled();
      expect(instance.animation).toBe(null);
    });
  });

  describe('segments', () => {
    test('should autoplay segment when defined', (done) => {
      const spy = jest.fn();
      mount(<ReactLottie animationData={animationData} segments={[5, 10]} onSegmentStart={spy} />);
      setTimeout(() => {
        expect(spy).toHaveBeenCalledWith({ firstFrame: 5, totalFrames: 5, type: 'segmentStart' });
        done();
      }, 1000);
    });
    test('should handle multiple segments', (done) => {
      const spy = jest.fn();
      mount(<ReactLottie
        animationData={animationData}
        segments={[[2, 4], [6, 10], [15, 24]]}
        onSegmentStart={spy}
      />);
      setTimeout(() => {
        expect(spy.mock.calls[0][0])
          .toEqual(expect.objectContaining({ firstFrame: 2, totalFrames: 2, type: 'segmentStart' }));

        expect(spy.mock.calls[1][0])
          .toEqual(expect.objectContaining({ firstFrame: 6, totalFrames: 4, type: 'segmentStart' }));

        expect(spy.mock.calls[2][0])
          .toEqual(expect.objectContaining({ firstFrame: 15, totalFrames: 9, type: 'segmentStart' }));
        done();
      }, 1000);
    });
    test('should play segments when property is udpated', (done) => {
      const spy = jest.fn();
      const wrapper = mount(<ReactLottie animationData={animationData} onSegmentStart={spy} />);

      wrapper.setProps({ segments: [10, 14] });

      setTimeout(() => {
        expect(spy).toHaveBeenCalledWith({ firstFrame: 10, totalFrames: 4, type: 'segmentStart' });
        done();
      }, 1000);
    });
    describe('force segments', () => {
      test('should wait until current segment is complete when not forced', (done) => {
        const onSegmentStart = jest.fn();
        const onEnterFrame = jest.fn();
        const wrapper = mount(<ReactLottie
          animationData={animationData}
          onEnterFrame={onEnterFrame}
          onSegmentStart={onSegmentStart}
        />);

        const { totalFrames } = wrapper.instance().animation;

        setTimeout(() => wrapper.setProps({
          segments: [2, 4],
          forceSegments: false,
        }), 0);

        setTimeout(() => {
          expect(onEnterFrame.mock.calls.length).toBeGreaterThan(totalFrames);
          expect(onSegmentStart).toHaveBeenCalled();
          done();
        }, 1000);
      });
      test('should immediately play segment when forced', (done) => {
        const onSegmentStart = jest.fn();
        const onEnterFrame = jest.fn();
        const wrapper = mount(<ReactLottie
          animationData={animationData}
          onEnterFrame={onEnterFrame}
          onSegmentStart={onSegmentStart}
        />);

        const { totalFrames } = wrapper.instance().animation;

        setTimeout(() => wrapper.setProps({
          segments: [2, 4],
          forceSegments: true,
        }), 0);

        setTimeout(() => {
          expect(onEnterFrame.mock.calls.length).toBeLessThan(totalFrames);
          expect(onSegmentStart).toHaveBeenCalled();
          done();
        }, 1000);
      });
    });
  });

  describe('autoplay', () => {
    test('should not autoplay when `isStopped=true`', (done) => {
      const onEnterFrame = jest.fn();
      mount(<ReactLottie
        animationData={animationData}
        autoplay
        isStopped
        onEnterFrame={onEnterFrame}
      />);
      setTimeout(() => {
        expect(onEnterFrame).not.toHaveBeenCalled();
        done();
      }, 1000);
    });
    test('should not autoplay when `isPaused=true`', (done) => {
      const onEnterFrame = jest.fn();
      mount(<ReactLottie
        animationData={animationData}
        autoplay
        isPaused
        onEnterFrame={onEnterFrame}
      />);
      setTimeout(() => {
        expect(onEnterFrame).not.toHaveBeenCalled();
        done();
      }, 1000);
    });
    test('should autoplay by default', (done) => {
      const onEnterFrame = jest.fn();
      mount(<ReactLottie
        animationData={animationData}
        onEnterFrame={onEnterFrame}
      />);
      setTimeout(() => {
        expect(onEnterFrame).toHaveBeenCalled();
        done();
      }, 1000);
    });
    test('should autoplay when set to true', (done) => {
      const onEnterFrame = jest.fn();
      mount(<ReactLottie
        animationData={animationData}
        autoplay
        onEnterFrame={onEnterFrame}
      />);
      setTimeout(() => {
        expect(onEnterFrame).toHaveBeenCalled();
        done();
      }, 1000);
    });
    test('should not autoplay when set to false', (done) => {
      const onEnterFrame = jest.fn();
      mount(<ReactLottie
        animationData={animationData}
        autoplay={false}
        onEnterFrame={onEnterFrame}
      />);
      setTimeout(() => {
        expect(onEnterFrame).not.toHaveBeenCalled();
        done();
      }, 1000);
    });
    test('should not autoplay segments when false', (done) => {
      const onEnterFrame = jest.fn();
      const onSegmentStart = jest.fn();
      mount(<ReactLottie
        animationData={animationData}
        autoplay={false}
        segments={[2, 4]}
        onEnterFrame={onEnterFrame}
        onSegmentStart={onSegmentStart}
      />);
      setTimeout(() => {
        expect(onEnterFrame).not.toHaveBeenCalled();
        expect(onSegmentStart).not.toHaveBeenCalled();
        done();
      }, 1000);
    });
  });

  describe('loop', () => {
    test('should not loop by default', (done) => {
      const onLoopComplete = jest.fn();
      mount(<ReactLottie
        animationData={animationData}
        onLoopComplete={onLoopComplete}
      />);
      setTimeout(() => {
        expect(onLoopComplete).not.toHaveBeenCalled();
        done();
      }, 1000);
    });
    test('should not loop when set to false', (done) => {
      const onLoopComplete = jest.fn();
      mount(<ReactLottie
        animationData={animationData}
        loop={false}
        onLoopComplete={onLoopComplete}
      />);
      setTimeout(() => {
        expect(onLoopComplete).not.toHaveBeenCalled();
        done();
      }, 1000);
    });
    test('should loop when set to true', (done) => {
      const onLoopComplete = jest.fn();
      mount(<ReactLottie
        animationData={animationData}
        loop
        onLoopComplete={onLoopComplete}
      />);
      setTimeout(() => {
        expect(onLoopComplete).toHaveBeenCalled();
        done();
      }, 1000);
    });
  });

  describe('refs', () => {
    describe('innerRef', () => {
      test('should return innerRef as container div element', () => {
        const spy = jest.fn();
        const wrapper = mount(<ReactLottie
          animationData={animationData}
          innerRef={spy}
        />);

        expect(spy).toHaveBeenCalledWith(wrapper.instance().container);
      });
    });
    describe('animationRef', () => {
      test('should return animationRef as lottie animation instance', () => {
        const spy = jest.fn();
        const wrapper = mount(<ReactLottie
          animationData={animationData}
          animationRef={spy}
        />);

        expect(spy).toHaveBeenCalledWith(wrapper.instance().animation);
      });
    });
  });
});
