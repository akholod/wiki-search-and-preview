if (typeof jQuery == 'undefined') {
    console.log('jQuery hasn\'t loaded');
}

$(function(){
    var searchField = $('#searchField');
    var searchResult = $('#searchResult');
    searchField.val('');
    
    function wikiSearch(search, lang) {
        console.log('ajax');
        $.ajax({
            url: '//'+ lang +'.wikipedia.org/w/api.php',
            data: {action: 'query', list: 'search', srsearch: search, format: 'json'},
            dataType: 'jsonp',
            success: function (x) {
                console.log('success');
                var html ='<h1>Search results</h1>';
                x.query.search.forEach(function (item) {
                    html += '<a class="article" href="https://en.wikipedia.org/wiki/' + item.title + '" target="_blank">';
                    html += '<h3 class="article-head">'+ item.title +'</h3><p class="article-content">'+ item.snippet +'</p>';
                    html += '</a>';
                });
                searchResult.html(html);
            }
        });
    }
    //if user use cyrillic, search at ru Wiki
    function isCyrillic (text) {
        if(/[а-я]/i.test(text)) {
            return 'ru'
        } else {
            return 'en'
        }
    }
    searchField.keyup(function(){
        var searchText = $(this).val();
        if (searchText.length > 2) {
            console.log(searchText);
            wikiSearch(searchText, isCyrillic(searchText));
        } else {
            searchResult.html('')
        }
     });
});