define({
  "main": {
    "id": "G",
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
            118,
            180
          ],
          [
            118,
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
      "id": "Rel1",
      "class": "subgraph",
      "shapes": [],
      "labels": []
    },
    {
      "id": "edge",
      "class": "node",
      "shapes": [],
      "labels": []
    },
    {
      "id": "A",
      "class": "node",
      "shapes": [
        {
          "shape": "ellipse",
          "cx": 91,
          "cy": 162,
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
          "x": 91,
          "y": 157.8,
          "text": "A",
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
      "id": "B",
      "class": "node",
      "shapes": [
        {
          "shape": "ellipse",
          "cx": 27,
          "cy": 90,
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
          "x": 27,
          "y": 85.8,
          "text": "B",
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
      "id": "A->B",
      "class": "relation",
      "shapes": [
        {
          "shape": "bspline",
          "points": [
            [
              77.43,
              146.15
            ],
            [
              66.57,
              134.28
            ],
            [
              51.41,
              117.7
            ],
            [
              40.55,
              105.82
            ]
          ],
          "style": [
            {
              "key": "stroke",
              "value": "#ff0000"
            },
            {
              "key": "fill",
              "value": "none"
            }
          ]
        }
      ],
      "labels": []
    },
    {
      "id": "C",
      "class": "node",
      "shapes": [
        {
          "shape": "ellipse",
          "cx": 59,
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
          "x": 59,
          "y": 13.8,
          "text": "C",
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
      "id": "B->C",
      "class": "relation",
      "shapes": [
        {
          "shape": "bspline",
          "points": [
            [
              28.99,
              71.7
            ],
            [
              33.06,
              60.2
            ],
            [
              39.98,
              45.24
            ],
            [
              46.37,
              34.2
            ]
          ],
          "style": [
            {
              "key": "stroke",
              "value": "#ff0000"
            },
            {
              "key": "fill",
              "value": "none"
            }
          ]
        },
        {
          "shape": "bspline",
          "points": [
            [
              39.62,
              73.81
            ],
            [
              44.39,
              65.57
            ],
            [
              49.45,
              55.15
            ],
            [
              53.41,
              45.62
            ]
          ],
          "style": [
            {
              "key": "stroke",
              "value": "#0000ff"
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
              56.73,
              46.72
            ],
            [
              57.07,
              36.13
            ],
            [
              50.2,
              44.2
            ]
          ],
          "style": [
            {
              "key": "style",
              "value": "solid"
            },
            {
              "key": "stroke",
              "value": "#0000ff"
            },
            {
              "key": "fill",
              "value": "#0000ff"
            }
          ]
        }
      ],
      "labels": []
    },
    {
      "id": "C->A",
      "class": "relation",
      "shapes": [
        {
          "shape": "bspline",
          "points": [
            [
              58.31,
              36.43
            ],
            [
              61.66,
              64.11
            ],
            [
              73.79,
              117.76
            ],
            [
              82.84,
              144.71
            ]
          ],
          "style": [
            {
              "key": "stroke",
              "value": "#ff0000"
            },
            {
              "key": "fill",
              "value": "none"
            }
          ]
        },
        {
          "shape": "bspline",
          "points": [
            [
              67.17,
              35.31
            ],
            [
              75.25,
              59.41
            ],
            [
              85.8,
              104.81
            ],
            [
              90.34,
              133.94
            ]
          ],
          "style": [
            {
              "key": "stroke",
              "value": "#0000ff"
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
              86.88,
              134.45
            ],
            [
              91.72,
              143.87
            ],
            [
              93.81,
              133.48
            ]
          ],
          "style": [
            {
              "key": "style",
              "value": "solid"
            },
            {
              "key": "stroke",
              "value": "#0000ff"
            },
            {
              "key": "fill",
              "value": "#0000ff"
            }
          ]
        }
      ],
      "labels": []
    },
    {
      "id": "Rel2",
      "class": "subgraph",
      "shapes": [],
      "labels": []
    }
  ]
});