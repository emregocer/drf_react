from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination


class PageNumberPaginationWithTotalPages(PageNumberPagination):
    def get_paginated_response(self, data):
        return Response(
            {
                "total_pages": self.page.paginator.num_pages,
                "count": self.page.paginator.count,
                "results": data,
            }
        )
