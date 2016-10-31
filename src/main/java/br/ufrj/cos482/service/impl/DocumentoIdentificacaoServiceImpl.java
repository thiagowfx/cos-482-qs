package br.ufrj.cos482.service.impl;

import br.ufrj.cos482.service.DocumentoIdentificacaoService;
import br.ufrj.cos482.domain.DocumentoIdentificacao;
import br.ufrj.cos482.repository.DocumentoIdentificacaoRepository;
import br.ufrj.cos482.service.dto.DocumentoIdentificacaoDTO;
import br.ufrj.cos482.service.mapper.DocumentoIdentificacaoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing DocumentoIdentificacao.
 */
@Service
@Transactional
public class DocumentoIdentificacaoServiceImpl implements DocumentoIdentificacaoService{

    private final Logger log = LoggerFactory.getLogger(DocumentoIdentificacaoServiceImpl.class);
    
    @Inject
    private DocumentoIdentificacaoRepository documentoIdentificacaoRepository;

    @Inject
    private DocumentoIdentificacaoMapper documentoIdentificacaoMapper;

    /**
     * Save a documentoIdentificacao.
     *
     * @param documentoIdentificacaoDTO the entity to save
     * @return the persisted entity
     */
    public DocumentoIdentificacaoDTO save(DocumentoIdentificacaoDTO documentoIdentificacaoDTO) {
        log.debug("Request to save DocumentoIdentificacao : {}", documentoIdentificacaoDTO);
        DocumentoIdentificacao documentoIdentificacao = documentoIdentificacaoMapper.documentoIdentificacaoDTOToDocumentoIdentificacao(documentoIdentificacaoDTO);
        documentoIdentificacao = documentoIdentificacaoRepository.save(documentoIdentificacao);
        DocumentoIdentificacaoDTO result = documentoIdentificacaoMapper.documentoIdentificacaoToDocumentoIdentificacaoDTO(documentoIdentificacao);
        return result;
    }

    /**
     *  Get all the documentoIdentificacaos.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<DocumentoIdentificacaoDTO> findAll() {
        log.debug("Request to get all DocumentoIdentificacaos");
        List<DocumentoIdentificacaoDTO> result = documentoIdentificacaoRepository.findAll().stream()
            .map(documentoIdentificacaoMapper::documentoIdentificacaoToDocumentoIdentificacaoDTO)
            .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }

    /**
     *  Get one documentoIdentificacao by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public DocumentoIdentificacaoDTO findOne(Long id) {
        log.debug("Request to get DocumentoIdentificacao : {}", id);
        DocumentoIdentificacao documentoIdentificacao = documentoIdentificacaoRepository.findOne(id);
        DocumentoIdentificacaoDTO documentoIdentificacaoDTO = documentoIdentificacaoMapper.documentoIdentificacaoToDocumentoIdentificacaoDTO(documentoIdentificacao);
        return documentoIdentificacaoDTO;
    }

    /**
     *  Delete the  documentoIdentificacao by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete DocumentoIdentificacao : {}", id);
        documentoIdentificacaoRepository.delete(id);
    }
}
