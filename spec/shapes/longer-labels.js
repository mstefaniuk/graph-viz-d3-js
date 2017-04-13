define({
  "main": {
    "id": null,
    "class": "digraph",
    "shapes": [
      {
        "shape": "polygon",
        "points": [
          [
            0,
            0
          ],
          [
            0,
            180
          ],
          [
            71.41,
            180
          ],
          [
            71.41,
            0
          ]
        ],
        "style": [
          {
            "key": "stroke",
            "value": "#fffffe00"
          },
          {
            "key": "fill",
            "value": "#ffffff"
          }
        ]
      }
    ],
    "labels": []
  },
  "groups": [
    {
      "id": "longer",
      "class": "node",
      "shapes": [
        {
          "shape": "ellipse",
          "cx": 35.71,
          "cy": 162,
          "rx": 35.92,
          "ry": 18,
          "style": [
            {
              "key": "stroke",
              "value": "#000000"
            },
            {
              "key": "fill",
              "value": "none"
            }
          ]
        }
      ],
      "labels": [
        {
          "x": 35.71,
          "y": 157.8,
          "text": "longer",
          "anchor": "middle",
          "style": [
            {
              "key": "font-family",
              "value": "'Times-Roman',serif"
            },
            {
              "key": "font-size",
              "value": 14
            },
            {
              "key": "stroke",
              "value": "#000000"
            }
          ]
        }
      ]
    },
    {
      "id": "labels",
      "class": "node",
      "shapes": [
        {
          "shape": "ellipse",
          "cx": 35.71,
          "cy": 90,
          "rx": 33.62,
          "ry": 18,
          "style": [
            {
              "key": "stroke",
              "value": "#000000"
            },
            {
              "key": "fill",
              "value": "none"
            }
          ]
        }
      ],
      "labels": [
        {
          "x": 35.71,
          "y": 85.8,
          "text": "labels",
          "anchor": "middle",
          "style": [
            {
              "key": "font-family",
              "value": "'Times-Roman',serif"
            },
            {
              "key": "font-size",
              "value": 14
            },
            {
              "key": "stroke",
              "value": "#000000"
            }
          ]
        }
      ]
    },
    {
      "id": "longer->labels",
      "class": "relation",
      "shapes": [
        {
          "shape": "bspline",
          "points": [
            [
              35.71,
              143.7
            ],
            [
              35.71,
              135.98
            ],
            [
              35.71,
              126.71
            ],
            [
              35.71,
              118.11
            ]
          ],
          "style": [
            {
              "key": "stroke",
              "value": "#000000"
            },
            {
              "key": "fill",
              "value": "none"
            }
          ]
        },
        {
          "shape": "polygon",
          "points": [
            [
              39.21,
              118.1
            ],
            [
              35.71,
              108.1
            ],
            [
              32.21,
              118.1
            ]
          ],
          "style": [
            {
              "key": "style",
              "value": "solid"
            },
            {
              "key": "stroke",
              "value": "#000000"
            },
            {
              "key": "fill",
              "value": "#000000"
            }
          ]
        }
      ],
      "labels": []
    },
    {
      "id": "ok",
      "class": "node",
      "shapes": [
        {
          "shape": "ellipse",
          "cx": 35.71,
          "cy": 18,
          "rx": 27,
          "ry": 18,
          "style": [
            {
              "key": "stroke",
              "value": "#000000"
            },
            {
              "key": "fill",
              "value": "none"
            }
          ]
        }
      ],
      "labels": [
        {
          "x": 35.71,
          "y": 13.8,
          "text": "ok",
          "anchor": "middle",
          "style": [
            {
              "key": "font-family",
              "value": "'Times-Roman',serif"
            },
            {
              "key": "font-size",
              "value": 14
            },
            {
              "key": "stroke",
              "value": "#000000"
            }
          ]
        }
      ]
    },
    {
      "id": "labels->ok",
      "class": "relation",
      "shapes": [
        {
          "shape": "bspline",
          "points": [
            [
              35.71,
              71.7
            ],
            [
              35.71,
              63.98
            ],
            [
              35.71,
              54.71
            ],
            [
              35.71,
              46.11
            ]
          ],
          "style": [
            {
              "key": "stroke",
              "value": "#000000"
            },
            {
              "key": "fill",
              "value": "none"
            }
          ]
        },
        {
          "shape": "polygon",
          "points": [
            [
              39.21,
              46.1
            ],
            [
              35.71,
              36.1
            ],
            [
              32.21,
              46.1
            ]
          ],
          "style": [
            {
              "key": "style",
              "value": "solid"
            },
            {
              "key": "stroke",
              "value": "#000000"
            },
            {
              "key": "fill",
              "value": "#000000"
            }
          ]
        }
      ],
      "labels": []
    }
  ]
});