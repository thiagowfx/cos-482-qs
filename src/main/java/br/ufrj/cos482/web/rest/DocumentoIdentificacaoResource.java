package br.ufrj.cos482.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.ufrj.cos482.service.DocumentoIdentificacaoService;
import br.ufrj.cos482.web.rest.util.HeaderUtil;
import br.ufrj.cos482.service.dto.DocumentoIdentificacaoDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST controller for managing DocumentoIdentificacao.
 */
@RestController
@RequestMapping("/api")
public class DocumentoIdentificacaoResource {

    private final Logger log = LoggerFactory.getLogger(DocumentoIdentificacaoResource.class);
        
    @Inject
    private DocumentoIdentificacaoService documentoIdentificacaoService;

    /**
     * POST  /documento-identificacaos : Create a new documentoIdentificacao.
     *
     * @param documentoIdentificacaoDTO the documentoIdentificacaoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new documentoIdentificacaoDTO, or with status 400 (Bad Request) if the documentoIdentificacao has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/documento-identificacaos",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<DocumentoIdentificacaoDTO> createDocumentoIdentificacao(@RequestBody DocumentoIdentificacaoDTO documentoIdentificacaoDTO) throws URISyntaxException {
        log.debug("REST request to save DocumentoIdentificacao : {}", documentoIdentificacaoDTO);
        if (documentoIdentificacaoDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("documentoIdentificacao", "idexists", "A new documentoIdentificacao cannot already have an ID")).body(null);
        }
        DocumentoIdentificacaoDTO result = documentoIdentificacaoService.save(documentoIdentificacaoDTO);
        return ResponseEntity.created(new URI("/api/documento-identificacaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("documentoIdentificacao", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /documento-identificacaos : Updates an existing documentoIdentificacao.
     *
     * @param documentoIdentificacaoDTO the documentoIdentificacaoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated documentoIdentificacaoDTO,
     * or with status 400 (Bad Request) if the documentoIdentificacaoDTO is not valid,
     * or with status 500 (Internal Server Error) if the documentoIdentificacaoDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/documento-identificacaos",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<DocumentoIdentificacaoDTO> updateDocumentoIdentificacao(@RequestBody DocumentoIdentificacaoDTO documentoIdentificacaoDTO) throws URISyntaxException {
        log.debug("REST request to update DocumentoIdentificacao : {}", documentoIdentificacaoDTO);
        if (documentoIdentificacaoDTO.getId() == null) {
            return createDocumentoIdentificacao(documentoIdentificacaoDTO);
        }
        DocumentoIdentificacaoDTO result = documentoIdentificacaoService.save(documentoIdentificacaoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("documentoIdentificacao", documentoIdentificacaoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /documento-identificacaos : get all the documentoIdentificacaos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of documentoIdentificacaos in body
     */
    @RequestMapping(value = "/documento-identificacaos",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<DocumentoIdentificacaoDTO> getAllDocumentoIdentificacaos() {
        log.debug("REST request to get all DocumentoIdentificacaos");
        return documentoIdentificacaoService.findAll();
    }

    /**
     * GET  /documento-identificacaos/:id : get the "id" documentoIdentificacao.
     *
     * @param id the id of the documentoIdentificacaoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the documentoIdentificacaoDTO, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/documento-identificacaos/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<DocumentoIdentificacaoDTO> getDocumentoIdentificacao(@PathVariable Long id) {
        log.debug("REST request to get DocumentoIdentificacao : {}", id);
        DocumentoIdentificacaoDTO documentoIdentificacaoDTO = documentoIdentificacaoService.findOne(id);
        return Optional.ofNullable(documentoIdentificacaoDTO)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /documento-identificacaos/:id : delete the "id" documentoIdentificacao.
     *
     * @param id the id of the documentoIdentificacaoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/documento-identificacaos/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteDocumentoIdentificacao(@PathVariable Long id) {
        log.debug("REST request to delete DocumentoIdentificacao : {}", id);
        documentoIdentificacaoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("documentoIdentificacao", id.toString())).build();
    }

}
