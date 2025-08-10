FROM python:3.11-slim

# Set the working directory to the Django project root
WORKDIR /usr/src/app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
# Fix the PYTHONPATH to point to the correct directory
ENV PYTHONPATH=/usr/src/app

RUN apt-get update && apt-get install -y netcat-openbsd
RUN pip install --upgrade pip

COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY ./entrypoint.sh .
RUN sed -i 's/\r$//g' /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

# Copy all project files
COPY . .

ENTRYPOINT ["/usr/src/app/entrypoint.sh"]