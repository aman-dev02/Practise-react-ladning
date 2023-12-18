import React, { Fragment, useState } from 'react';
import { Transition, Menu } from '@headlessui/react';
import {useNavigate} from 'react-router-dom';


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const navigate=useNavigate();
  return (
    <header className="flex font-primary flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm">
      <nav className="mt-6 relative max-w-[85rem] w-full   border-gray-200 rounded-[36px] mx-2 py-3 px-4 md:flex md:items-center md:justify-between md:py-0 md:px-6 lg:px-8 xl:mx-auto bg-white/[.05] hover:bg-white/[.1] border border-white/[.05]" aria-label="Global" >
        <div className="flex items-center justify-between">
          <div className='flex justify-center items-center'>
          <svg fill="#fff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="22px" height="22px" viewBox="0 0 122.3 122.3" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M116.3,15.15H6c-3.3,0-6,2.7-6,6v80c0,3.3,2.7,6,6,6h110.3c3.3,0,6-2.7,6-6v-80C122.3,17.85,119.6,15.15,116.3,15.15z M42.6,57.75l-19.7,19.7c-1.7,1.7-4.2,2.3-6.3,1.4c-4.3-1.8-5-7-2.1-9.9l11.2-11.2c2.3-2.3,2.3-6.1,0-8.5l-11.3-11.2 c-2.9-2.9-2.2-8.1,2.1-9.9c2.2-0.9,4.7-0.3,6.3,1.4l19.7,19.7c1.2,1.2,1.8,2.7,1.8,4.2S43.8,56.55,42.6,57.75z M86.5,79.15h-36 c-3.3,0-6-2.7-6-6s2.7-6,6-6h36c3.3,0,6,2.7,6,6S89.8,79.15,86.5,79.15z"></path> </g> </g></svg>
          <a className=" text-white flex-none text-xl font-semibold mx-2" href="#" aria-label="Brand">
            ConX
          </a>
          </div>
          <div className="md:hidden">
            {/* Mobile Menu Button */}
            <Menu>
              <Menu.Button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="hs-collapse-toggle w-8 h-8 flex justify-center items-center text-sm font-semibold rounded-full border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation">
                <svg className="hs-collapse-open:hidden flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
                <svg className="hs-collapse-open:block hidden flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </Menu.Button>
            </Menu>
          </div>
        </div>
        <div id="navbar-collapse-with-animation" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block">
          <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:items-center md:justify-end md:gap-y-0 md:gap-x-7 md:mt-0 md:ps-7">
            {/* Your main menu items for desktop screens */}
            <a className="font-medium text-gray-200 hover:text-white" href="#" aria-current="page">
              About us
            </a>
            <a className="font-medium text-gray-200 hover:text-white md:py-6 dark:text-gray-400 dark:hover:text-gray-200" href="#">
              What we do
            </a>
            <a className="font-medium text-gray-200 hover:text-white md:py-6 dark:text-gray-400 dark:hover:text-gray-200" href="#">
              Testimonials
            </a>
            <a className="font-medium text-gray-200 hover:text-white md:py-6 dark:text-gray-400 dark:hover:text-gray-500" href="#">
              Contact us
            </a>

        

            {/* Log in button */}
            <a className="flex items-center gap-x-2 font-medium cursor-pointer text-gray-200 hover:text-white md:border-s md:border-gray-300 md:my-6 md:ps-6 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500" onClick={()=> navigate('/signup')}>
              <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Log in
            </a>
          </div>
        </div>
        {/* Mobile Menu */}
        <Transition show={isMobileMenuOpen} as={Fragment}>
        <div>
          <Menu>
            <Menu.Button> {/* The button that triggers the menu */}
      
            </Menu.Button>
            <Transition.Child as={Fragment}>
              <Menu.Items>
                <div className="flex flex-col gap-y-4 py-2 px-4">
                  {/* Your mobile menu items */}
                  <a className="font-medium text-blue-600 py-2" href="#" aria-current="page">
                    Landing
                  </a>
                  <a className="font-medium text-gray-500 hover:text-gray-400 py-2" href="#">
                    Account
                  </a>
                  <a className="font-medium text-gray-500 hover:text-gray-400 py-2" href="#">
                    Work
                  </a>
                  <a className="font-medium text-gray-500 hover:text-gray-400 py-2" href="#">
                    Blog
                  </a>
                  <a className="font-medium text-gray-500 hover:text-gray-400 py-2" href="#">
                    Downloads
                  </a>
                  <a className="font-medium text-gray-500 hover:text-gray-400 py-2" href="#">
                    Team Account
                  </a>
                </div>
              </Menu.Items>
            </Transition.Child>
          </Menu>
          </div>
        </Transition>
      </nav>
    </header>
  );
};

export default Navbar;
