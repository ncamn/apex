###
# Intermediate step to build the executable binary
###
FROM golang:1.9 AS intermediate

WORKDIR $GOPATH/src/github.com/ncamn/apex

# Copy project into image
COPY . .

# Build the binary
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -installsuffix cgo -o /go/bin/api

###
# Build the final Docker image
###
FROM scratch

# Expose port 80
EXPOSE 80

# Copy our static executable
COPY --from=intermediate /go/bin/api .

# Command is run when container starts
ENTRYPOINT ["./api"]