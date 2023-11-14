import React from 'react'

const Pagination = () => {
  return (
    <div>
        <nav aria-label="Page navigation">
              <ul className="inline-flex -space-x-px text-sm uppercase">
                <li>
                  <a
                    href="prev"
                    className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-gray-300 border border-e-0 border-gray-300 rounded-s-full"
                  >
                    <svg
                      fill="gray"
                      height="10px"
                      width="16px"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 490 490"
                      xmlSpace="preserve"
                    >
                      <g>
                        <g>
                          <polygon points="332.668,490 82.631,244.996 332.668,0 407.369,76.493 235.402,244.996 407.369,413.507" />
                        </g>
                      </g>
                    </svg>
                    Prev
                  </a>
                </li>
                <li>
                  <a
                    href="current"
                    className="flex items-center justify-center px-3 h-8 leading-tight  bg-[#65c3c8] border border-gray-300"
                  >
                    1
                  </a>
                </li>
                <li>
          <a
            href="next"
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-gray-300 border border-gray-300 rounded-e-full"
          >
            Next
            <svg
              fill="gray"
              height="10px"
              width="16px"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 490 490"
              xmlSpace="preserve"
            >
              <g>
                <g>
                  <polygon points="157.332,0 407.369,245.004 157.332,490 82.631,413.507 254.598,245.004 82.631,76.493" />
                </g>
              </g>
            </svg>
          </a>
        </li>
              </ul>
            </nav>
    </div>
  )
}

export default Pagination