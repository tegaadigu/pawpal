import 'package:flutter/material.dart';

class CustomCard extends StatelessWidget {
  final List<Map<String, String>> featuredItems = [
    {
      'title': 'Kukis Park',
      'imageUrl': 'https://picsum.photos/id/1/200/300',
      'rating': '4.7',
    },
    {
      'title': 'Ruths Park',
      'imageUrl': 'https://picsum.photos/id/2/200/300',
      'rating': '4.8',
    },
    {
      'title': '33 holly st',
      'imageUrl': 'https://picsum.photos/id/3/200/300',
      'rating': '4.6',
    },
    {
      'title': 'Tegas park',
      'imageUrl': 'https://picsum.photos/id/4/200/300',
      'rating': '4.5',
    },
  ];
  String _title = "";
  List<Map<String, String>> _items = [];

  CustomCard({String title = "Parks Near You", List<Map<String, String>>? items  }){
    _title = title;
    _items = items ?? featuredItems;
  }
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(_title, style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
        SizedBox(height: 8),
        SizedBox(
          height: 170,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: _items.length,
            itemBuilder: (context, index) {
              final item = _items[index];
              return Padding(
                padding: const EdgeInsets.only(right: 8.0),
                child: Card(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Column(
                    children: [
                      ClipRRect(
                        borderRadius: BorderRadius.vertical(
                          top: Radius.circular(10),
                        ),
                        child: Image.network(
                          item['imageUrl']!,
                          height: 100,
                          width: 150,
                          fit: BoxFit.cover,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              item['title']!,
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            SizedBox(height: 4),
                            Text( item['rating'] != null ?
                              'Rating: ${item['rating']}' : 'Reward: ${item['reward']}',
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: TextStyle(color: Colors.grey),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              );
            })
        )
      ],
    );
  }
}