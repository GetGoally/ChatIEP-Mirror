import React, { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

import { useLayoutContext } from '@/utils/context/LayoutContext';
import Link from 'next/link';

const Navigation = () => {
  const { isMenuOpen } = useLayoutContext();
  const [subMenuOpen, setSubMenuOpen] = useState(-1);
  const toggleMenu = (x) => setSubMenuOpen(subMenuOpen === x ? -1 : x);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className={twMerge(
        'menu-wrapper-transition fixed top-0 left-0 right-0 bottom-0 z-10 w-full translate-x-full  overflow-scroll bg-white pt-[92px] lg:static lg:translate-x-0 lg:overflow-visible lg:p-0',
        isMenuOpen ? 'z-40 translate-x-0 translate-y-0' : '',
      )}
    >
      <ul className="pl-[19px] pb-4 lg:flex lg:items-center lg:pl-[20px] lg:pb-0">
        <li className="group pb-4 lg:relative lg:hidden lg:px-[20px] lg:py-[13px]">
          <Link
            href="/"
            className={twMerge(
              'higlight-menu-item relative inline-block pl-[15px] font-rubik text-2xl font-normal leading-[1.08]  before:absolute before:bottom-0  before:z-[-1] before:h-3 before:bg-yellow before:opacity-0 hover:before:opacity-100 focus:before:opacity-100 active:before:opacity-100 lg:p-0 lg:text-xl lg:font-normal lg:leading-[1.31]',
              subMenuOpen == 0 ? 'before:opacity-100' : '',
            )}
          >
            Home
          </Link>
        </li>
        <li className="group pb-4 lg:relative lg:px-[20px] lg:py-[13px]">
          <a
            href={`${process.env.NEXT_PUBLIC_GOALLY_URL}/tablets/`}
            className={twMerge(
              'higlight-menu-item relative inline-block pl-[15px] font-rubik text-2xl font-normal leading-[1.08]  before:absolute before:bottom-0  before:z-[-1] before:h-3 before:bg-yellow before:opacity-0 hover:before:opacity-100 focus:before:opacity-100 active:before:opacity-100 lg:p-0 lg:text-xl lg:font-normal lg:leading-[1.31]',
              subMenuOpen == 1 ? 'before:opacity-100' : '',
            )}
          >
            Tablets
          </a>
        </li>
        <li className="group pb-4 lg:relative lg:px-[20px] lg:py-[13px]">
          <a
            href={`${process.env.NEXT_PUBLIC_GOALLY_URL}/goally-therapy-suite/`}
            className={twMerge(
              'higlight-menu-item relative inline-block pl-[15px] font-rubik text-2xl font-normal leading-[1.08]  before:absolute before:bottom-0  before:z-[-1] before:h-3 before:bg-yellow before:opacity-0 hover:before:opacity-100 focus:before:opacity-100 active:before:opacity-100 lg:p-0 lg:text-xl lg:font-normal lg:leading-[1.31]',
              subMenuOpen == 2 ? 'before:opacity-100' : '',
            )}
            onClick={(ev) => {
              if (windowSize.width && windowSize.width < 1024) {
                ev.preventDefault();
                toggleMenu(2);
              }
            }}
          >
            Apps
          </a>
          <ul
            className={twMerge(
              'sub-menu-shadow pt-4 lg:absolute lg:top-full lg:w-full lg:min-w-[260px] lg:rounded-xl lg:border lg:bg-white lg:py-[17px] lg:px-[10px] lg:group-hover:block',
              subMenuOpen == 2 ? '' : 'hidden',
            )}
          >
            <li>
              <a
                href={`${process.env.NEXT_PUBLIC_GOALLY_URL}/goally-therapy-suite/visual-schedule-app/`}
                className="navigation-sub-link inline-block pl-8 pr-[40px] pb-[13px] font-rubik text-base font-normal leading-tight lg:pl-2 lg:pr-0 lg:pt-0 lg:pb-[13px] lg:text-xl lg:leading-none "
              >
                Visual Schedules
              </a>
            </li>
            <li>
              <a
                href={`${process.env.NEXT_PUBLIC_GOALLY_URL}/goally-therapy-suite/word-lab/`}
                className="navigation-sub-link  inline-block pl-8 pr-[40px] pb-[13px] font-rubik text-base font-normal leading-tight lg:pl-2 lg:pr-0  lg:pt-0 lg:pb-[13px] lg:text-xl lg:leading-none "
              >
                Word Lab
              </a>
            </li>
            <li>
              <a
                href={`${process.env.NEXT_PUBLIC_GOALLY_URL}/goally-therapy-suite/game-garage/`}
                className="navigation-sub-link inline-block pl-8 pr-[40px] pb-[13px] font-rubik text-base font-normal leading-tight lg:pl-2 lg:pr-0  lg:pt-0 lg:pb-[13px] lg:text-xl lg:leading-none "
              >
                Game Garage
              </a>
            </li>
            <li>
              <a
                href={`${process.env.NEXT_PUBLIC_GOALLY_URL}/goally-therapy-suite/drawing-app-for-kids/`}
                className="navigation-sub-link inline-block pl-8 pr-[40px] pb-[13px] font-rubik text-base font-normal leading-tight lg:pl-2 lg:pr-0  lg:pt-0 lg:pb-[13px] lg:text-xl lg:leading-none "
              >
                Graffiti Street
              </a>
            </li>
            <li>
              <a
                href={`${process.env.NEXT_PUBLIC_GOALLY_URL}/goally-therapy-suite/weather-app-for-kids/`}
                className="navigation-sub-link inline-block pl-8 pr-[40px] pb-[13px] font-rubik text-base font-normal leading-tight lg:pl-2 lg:pr-0  lg:pt-0 lg:pb-[13px] lg:text-xl lg:leading-none "
              >
                Today’s Forecast
              </a>
            </li>
            <li>
              <a
                href={`${process.env.NEXT_PUBLIC_GOALLY_URL}/goally-therapy-suite/parent-app/`}
                className="navigation-sub-link inline-block pl-8 pr-[40px] pb-[13px] font-rubik text-base font-normal leading-tight lg:pl-2 lg:pr-0  lg:pt-0 lg:pb-[13px] lg:text-xl lg:leading-none "
              >
                Parent App
              </a>
            </li>
            <li>
              <a
                href={`${process.env.NEXT_PUBLIC_GOALLY_URL}/goally-therapy-suite/`}
                className="navigation-sub-link inline-block pl-8 pr-[40px] pb-[13px] font-rubik text-base font-normal leading-tight lg:pl-2 lg:pr-0  lg:pt-0 lg:pb-[0] lg:text-xl lg:leading-none "
              >
                See More
              </a>
            </li>
          </ul>
        </li>
        <li className="group pb-4 lg:relative lg:px-[20px] lg:py-[13px]">
          <a
            href={`${process.env.NEXT_PUBLIC_GOALLY_URL}/tablets/`}
            className={twMerge(
              'higlight-menu-item relative inline-block pl-[15px] font-rubik text-2xl font-normal leading-[1.08]  before:absolute before:bottom-0  before:z-[-1] before:h-3 before:bg-yellow before:opacity-0 hover:before:opacity-100 focus:before:opacity-100 active:before:opacity-100 lg:p-0 lg:text-xl lg:font-normal lg:leading-[1.31]',
              subMenuOpen == 3 ? 'before:opacity-100' : '',
            )}
            onClick={(ev) => {
              if (windowSize.width && windowSize.width < 1024) {
                ev.preventDefault();
                toggleMenu(3);
              }
            }}
          >
            Care Team
          </a>
          <ul
            className={twMerge(
              'sub-menu-shadow pt-4 lg:absolute lg:top-full lg:w-full lg:min-w-[260px] lg:rounded-xl lg:border lg:bg-white lg:py-[17px] lg:px-[10px] lg:group-hover:block',
              subMenuOpen == 3 ? '' : 'hidden',
            )}
          >
            <li>
              <a
                href={`${process.env.NEXT_PUBLIC_GOALLY_URL}/parents-neurodiverse/`}
                className="navigation-sub-link inline-block pl-8 pr-[40px] pb-[13px] font-rubik text-base font-normal leading-tight lg:pl-2 lg:pr-0 lg:pt-0 lg:pb-[13px] lg:text-xl lg:leading-none "
              >
                Moms & Dads
              </a>
            </li>
            <li>
              <a
                href={`${process.env.NEXT_PUBLIC_GOALLY_URL}/goallys-apps-for-teachers/`}
                className="navigation-sub-link  inline-block pl-8 pr-[40px] pb-[13px] font-rubik text-base font-normal leading-tight lg:pl-2 lg:pr-0  lg:pt-0 lg:pb-[13px] lg:text-xl lg:leading-none "
              >
                SPED Teachers
              </a>
            </li>
            <li>
              <a
                href={`${process.env.NEXT_PUBLIC_GOALLY_URL}/clinicians-teachers/behavior-therapy/`}
                className="navigation-sub-link inline-block pl-8 pr-[40px] pb-[13px] font-rubik text-base font-normal leading-tight lg:pl-2 lg:pr-0  lg:pt-0 lg:pb-[13px] lg:text-xl lg:leading-none "
              >
                BCBAs
              </a>
            </li>
            <li>
              <a
                href={`${process.env.NEXT_PUBLIC_GOALLY_URL}/clinicians-teachers/speech-therapy/`}
                className="navigation-sub-link inline-block pl-8 pr-[40px] pb-[13px] font-rubik text-base font-normal leading-tight lg:pl-2 lg:pr-0  lg:pt-0 lg:pb-[13px] lg:text-xl lg:leading-none "
              >
                Speech Therapists
              </a>
            </li>
            <li>
              <a
                href={`${process.env.NEXT_PUBLIC_GOALLY_URL}/clinicians-teachers/occupational-therapy/`}
                className="navigation-sub-link inline-block pl-8 pr-[40px] pb-[13px] font-rubik text-base font-normal leading-tight lg:pl-2 lg:pr-0  lg:pt-0 lg:pb-[0] lg:text-xl lg:leading-none "
              >
                Pediatric OTs
              </a>
            </li>
          </ul>
        </li>
        <li className="group pb-4 lg:relative lg:px-[20px] lg:py-[13px]">
          <a
            href={`${process.env.NEXT_PUBLIC_GOALLY_URL}/contact-us/`}
            className={twMerge(
              'higlight-menu-item relative inline-block pl-[15px] font-rubik text-2xl font-normal leading-[1.08]  before:absolute before:bottom-0  before:z-[-1] before:h-3 before:bg-yellow before:opacity-0 hover:before:opacity-100 focus:before:opacity-100 active:before:opacity-100 lg:p-0 lg:text-xl lg:font-normal lg:leading-[1.31]',
              subMenuOpen == 4 ? 'before:opacity-100' : '',
            )}
            onClick={(ev) => {
              if (windowSize.width && windowSize.width < 1024) {
                ev.preventDefault();
                toggleMenu(4);
              }
            }}
          >
            Resources
          </a>
          <ul
            className={twMerge(
              'sub-menu-shadow pt-4 lg:absolute lg:top-full lg:w-full lg:min-w-[260px] lg:rounded-xl lg:border lg:bg-white lg:py-[17px] lg:px-[10px] lg:group-hover:block',
              subMenuOpen == 4 ? '' : 'hidden',
            )}
          >
            <li>
              <a
                href={`${process.env.NEXT_PUBLIC_GOALLY_URL}/neurodiversopedia/`}
                className="navigation-sub-link inline-block pl-8 pr-[40px] pb-[13px] font-rubik text-base font-normal leading-tight lg:pl-2 lg:pr-0  lg:pt-0 lg:pb-[13px] lg:text-xl lg:leading-none"
              >
                Neurodiversopedia
              </a>
            </li>
            <li>
              <a
                href={`${process.env.NEXT_PUBLIC_GOALLY_URL}/blog/`}
                className="navigation-sub-link inline-block pl-8 pr-[40px] pb-[13px] font-rubik text-base font-normal leading-tight lg:pl-2 lg:pr-0  lg:pt-0 lg:pb-[13px] lg:text-xl lg:leading-none "
              >
                Goally Blog
              </a>
            </li>
            <li>
              <a
                href={`${process.env.NEXT_PUBLIC_GOALLY_URL}/contact-us/`}
                className="navigation-sub-link inline-block pl-8 pr-[40px] pb-[13px] font-rubik text-base font-normal leading-tight lg:pl-2 lg:pr-0  lg:pt-0 lg:pb-[0] lg:text-xl lg:leading-none"
              >
                Help Center
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
